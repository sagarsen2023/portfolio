import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LinearFilter,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  type Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  ShaderMaterial,
  type Texture,
  TextureLoader,
  Vector2,
  WireframeGeometry,
} from "three";
import {
  createRenderer,
  disposeObject,
  legacyIntensity,
  observeVisibility,
} from "./three-utils";

const PORTRAIT_HEIGHT = 5.7;

const portraitVertexShader = /* glsl */ `
uniform vec2 uMouse;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;
varying float vB;
void main() {
  vUv = uv;
  vec3 p = position;
  float d = distance(uv, uMouse);
  float b = (1. - smoothstep(0., .42, d)) * uHover;
  p.z += b * .32 + sin(uv.y * 5. + uTime * .8) * .02;
  vB = b;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
}`;

const portraitFragmentShader = /* glsl */ `
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;
varying float vB;
float rnd(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 uv = vUv;
  vec2 dir = uv - uMouse;
  float k = (1. - smoothstep(0., .33, length(dir))) * uHover;
  float r = texture2D(uTex, uv - dir * .03 * k).r;
  float g = texture2D(uTex, uv).g;
  float b = texture2D(uTex, uv + dir * .03 * k).b;
  vec3 c = vec3(r, g, b) * (1. + vB * .22);
  c += (rnd(uv * 900. + fract(uTime)) - .5) * .035;
  float l = dot(c, vec3(.299, .587, .114));
  float ex = smoothstep(0., .24, uv.x) * smoothstep(1., .8, uv.x);
  float ey = smoothstep(0., .2, uv.y) * smoothstep(1., .93, uv.y);
  gl_FragColor = vec4(c, ex * ey * mix(.8, 1., smoothstep(.0, .12, l)));
}`;

type Floater = Object3D & {
  userData: { spin: number; baseY: number; phase: number };
};

/**
 * Portrait plane with a pointer-driven bulge and chromatic split, framed by a
 * dark monolith, drifting cubes, a wire lattice and a dust field.
 * Returns a cleanup function, or null when WebGL is unavailable.
 */
export function createHeroScene(container: HTMLElement, portraitUrl: string) {
  const renderer = createRenderer({
    alpha: true,
    powerPreference: "high-performance",
  });
  if (!renderer) return null;
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 10.5);

  const root = new Group();
  scene.add(root);

  scene.add(new AmbientLight(0xffffff, legacyIntensity(0.06)));
  const rim = new DirectionalLight(0xffffff, legacyIntensity(3.2));
  rim.position.set(-5, 4, -4);
  scene.add(rim);
  const rim2 = new DirectionalLight(0xffffff, legacyIntensity(1.1));
  rim2.position.set(6, 2, -3);
  scene.add(rim2);
  // Legacy point lights faded linearly with distance; at ~9 units from the
  // props that is ~0.69 of full strength, so bake it in and drop the decay.
  const key = new PointLight(0xffffff, legacyIntensity(0.7 * 0.69), 30, 0);
  key.position.set(3, 3, 6);
  scene.add(key);

  const uniforms = {
    uTex: { value: null as Texture | null },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uHover: { value: 0 },
  };

  const portrait = new Mesh(
    new PlaneGeometry(PORTRAIT_HEIGHT * 0.75, PORTRAIT_HEIGHT, 90, 90),
    new ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: portraitVertexShader,
      fragmentShader: portraitFragmentShader,
    })
  );
  portrait.renderOrder = 2;
  root.add(portrait);

  let portraitTexture: Texture | null = null;
  new TextureLoader().load(portraitUrl, (texture) => {
    texture.minFilter = LinearFilter;
    portraitTexture = texture;
    uniforms.uTex.value = texture;
    const { width, height } = texture.image as HTMLImageElement;
    portrait.scale.x = width / height / 0.75;
  });

  const dark = new MeshStandardMaterial({
    color: 0x0c0c0c,
    metalness: 0.55,
    roughness: 0.26,
  });

  const monolith = new Mesh(new BoxGeometry(1.1, 5.4, 1.1), dark);
  monolith.position.set(2.6, -1.4, -2.6);
  monolith.rotation.y = 0.55;
  root.add(monolith);

  [
    [0.9, 0.5],
    [0.75, 0.32],
    [0.6, 0.2],
  ].forEach(([size, gap], i) => {
    const block = new Mesh(new BoxGeometry(size, 0.5, size), dark);
    block.position.set(2.6, 1.55 + i * (0.62 + gap), -2.6);
    block.rotation.y = 0.55 + i * 0.2;
    root.add(block);
  });

  const floaters: Floater[] = [];
  const track = (object: Object3D) => {
    object.userData = {
      spin: Math.random() - 0.5,
      baseY: object.position.y,
      phase: Math.random() * 6,
    };
    root.add(object);
    floaters.push(object as Floater);
  };

  for (let i = 0; i < 48; i++) {
    const t = i / 48;
    const size = 0.06 + Math.random() * 0.24 * (1 - t * 0.5);
    const cube = new Mesh(new BoxGeometry(size, size, size), dark);
    cube.position.set(
      2.6 + (Math.random() - 0.5) * (0.6 + t * 3.4),
      3.3 + t * 3 + Math.random() * 0.4,
      -2.6 + (Math.random() - 0.5) * (0.6 + t * 2.4)
    );
    cube.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    track(cube);
  }

  const wireMaterial = new LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
  });
  for (let i = 0; i < 7; i++) {
    const size = 0.2 + Math.random() * 0.35;
    const wire = new LineSegments(
      new EdgesGeometry(new BoxGeometry(size, size, size)),
      wireMaterial
    );
    wire.position.set(
      1.2 + Math.random() * 3,
      1.5 + Math.random() * 3,
      -2 + Math.random() * 1.5
    );
    track(wire);
  }

  const lattice = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(2.9, 1)),
    new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })
  );
  lattice.position.set(-0.3, 0.5, -3.2);
  root.add(lattice);

  const DUST = 700;
  const dustPositions = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 13;
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  const dustGeometry = new BufferGeometry();
  dustGeometry.setAttribute("position", new BufferAttribute(dustPositions, 3));
  const dust = new Points(
    dustGeometry,
    new PointsMaterial({
      color: 0xffffff,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    })
  );
  scene.add(dust);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let hover = 0;
  let hoverTarget = 0;
  let visible = true;
  const mouseTarget = new Vector2(0.5, 0.5);
  const raycaster = new Raycaster();
  const ndc = new Vector2();

  const onPointerMove = (event: PointerEvent) => {
    targetX = (event.clientX / window.innerWidth) * 2 - 1;
    targetY = (event.clientY / window.innerHeight) * 2 - 1;
    const rect = container.getBoundingClientRect();
    ndc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    );
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(portrait)[0];
    if (hit?.uv) {
      mouseTarget.copy(hit.uv);
      hoverTarget = 1;
    } else {
      hoverTarget = 0;
    }
  };
  window.addEventListener("pointermove", onPointerMove);

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width / height < 0.8 ? 13 : 10.5;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const stopObserving = observeVisibility(container, (v) => (visible = v));

  const start = performance.now();
  renderer.setAnimationLoop((now) => {
    if (!visible) return;
    const t = (now - start) / 1000;

    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    root.rotation.y = currentX * 0.22 + Math.sin(t * 0.2) * 0.05;
    root.rotation.x = currentY * 0.1;

    uniforms.uTime.value = t;
    hover += (hoverTarget - hover) * 0.06;
    uniforms.uHover.value = hover;
    uniforms.uMouse.value.lerp(mouseTarget, 0.12);

    lattice.rotation.y = t * 0.05;
    lattice.rotation.x = t * 0.03;

    floaters.forEach((floater) => {
      const { spin, baseY, phase } = floater.userData;
      floater.rotation.x += 0.003 + spin * 0.008;
      floater.rotation.y += 0.004;
      floater.position.y = baseY + Math.sin(t * 0.6 + phase) * 0.09;
    });

    dust.rotation.y = t * 0.015;
    dust.position.y = Math.sin(t * 0.2) * 0.12;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener("pointermove", onPointerMove);
    resizeObserver.disconnect();
    stopObserving();
    disposeObject(scene);
    portraitTexture?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
