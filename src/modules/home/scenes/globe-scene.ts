import {
  BufferAttribute,
  BufferGeometry,
  EllipseCurve,
  Group,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
} from "three";
import { createRenderer, disposeObject, observeVisibility } from "./three-utils";

const POINTS = 1400;
const RADIUS = 1.9;
const CAMERA_Z = 7.4;

// A glowing head sweeps through the points in spiral order, leaving a lit trail.
const vertexShader = /* glsl */ `
attribute float aOrd;
uniform float uT;
uniform float uPR;
varying float vA;
varying float vHot;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.);
  float head = fract(uT * .045);
  float d = head - aOrd;
  if (d < 0.) d += 1.;
  float filled = step(d, .62);
  vHot = exp(-d * 90.);
  float front = smoothstep(-1.9, 1.9, (viewMatrix * modelMatrix * vec4(position, 1.)).z + 7.4);
  vA = (.08 + filled * .32 + vHot * .9) * (.25 + .75 * front);
  gl_PointSize = (1.6 + vHot * 3.) * uPR * (7.4 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
varying float vA;
varying float vHot;
void main() {
  vec2 c = gl_PointCoord - .5;
  if (length(c) > .5) discard;
  vec3 col = mix(vec3(.95, .94, .92), vec3(.65, 1., 0.), clamp(vHot * 1.4, 0., 1.));
  gl_FragColor = vec4(col, vA);
}`;

type Scale = { x: number; y: number };

/**
 * Fibonacci-sphere point globe rendered into `canvas`, sized to `frame`.
 * `frame` may be scaled with a CSS transform, reported by `getScale`: the
 * drawing buffer keeps its layout size and only the camera follows the
 * on-screen aspect, so animating the frame never touches GPU buffers or
 * reads layout.
 * Returns a cleanup function, or null when WebGL is unavailable.
 */
export function createGlobeScene(
  canvas: HTMLCanvasElement,
  frame: HTMLElement,
  getScale: () => Scale = () => ({ x: 1, y: 1 })
) {
  const renderer = createRenderer({ canvas });
  if (!renderer) return null;
  renderer.setClearColor(0x000000, 1);

  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, 0.1, 200);
  camera.position.z = CAMERA_Z;

  const globe = new Group();
  globe.rotation.set(0.18, 0, 0.08);
  scene.add(globe);

  const positions = new Float32Array(POINTS * 3);
  const order = new Float32Array(POINTS);
  for (let i = 0; i < POINTS; i++) {
    const y = 1 - ((i + 0.5) / POINTS) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = i * 2.39996323;
    positions[i * 3] = Math.cos(theta) * r * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
    order[i] = i / POINTS;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aOrd", new BufferAttribute(order, 1));

  const uniforms = {
    uT: { value: 0 },
    uPR: { value: renderer.getPixelRatio() },
  };
  globe.add(
    new Points(
      geometry,
      new ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader,
        fragmentShader,
      })
    )
  );

  const ringMaterial = new LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.08,
  });
  [2.35, 2.75].forEach((radius) => {
    const points = new EllipseCurve(0, 0, radius, radius)
      .getPoints(200)
      .map((p) => new Vector3(p.x, p.y, 0));
    scene.add(
      new Line(new BufferGeometry().setFromPoints(points), ringMaterial)
    );
  });

  let width = 0;
  let height = 0;
  const resize = () => {
    width = frame.clientWidth;
    height = frame.clientHeight;
    if (width && height) renderer.setSize(width, height, false);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(frame);
  resize();

  let visible = true;
  const stopObserving = observeVisibility(frame, (v) => (visible = v));

  const start = performance.now();
  let aspect = 0;
  renderer.setAnimationLoop((now) => {
    if (!visible) return;

    const scale = getScale();
    if (width && height && scale.x && scale.y) {
      const nextAspect = (width * scale.x) / (height * scale.y);
      if (Math.abs(nextAspect - aspect) > 1e-4) {
        aspect = nextAspect;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
      }
      // Keep the point sprites the same on-screen size while scaled down.
      uniforms.uPR.value = renderer.getPixelRatio() / scale.y;
    }

    const t = (now - start) / 1000;
    uniforms.uT.value = t;
    globe.rotation.y = t * 0.08;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    stopObserving();
    disposeObject(scene);
    renderer.dispose();
  };
}
