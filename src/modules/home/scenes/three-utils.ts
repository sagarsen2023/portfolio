import {
  ColorManagement,
  LinearSRGBColorSpace,
  type Object3D,
  WebGLRenderer,
  type WebGLRendererParameters,
} from "three";

// The scenes were tuned against three's legacy pipeline (no colour management,
// linear output, intensities pre-multiplied by PI). Keep that look.
ColorManagement.enabled = false;

/** Converts a light intensity tuned for three's legacy lighting model. */
export const legacyIntensity = (intensity: number) => intensity * Math.PI;

export function createRenderer(params: WebGLRendererParameters = {}) {
  try {
    const renderer = new WebGLRenderer({ antialias: true, ...params });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = LinearSRGBColorSpace;
    return renderer;
  } catch {
    return null;
  }
}

/** Reports whether `el` is on (or near) screen so offscreen scenes can idle. */
export function observeVisibility(
  el: Element,
  onChange: (visible: boolean) => void
) {
  const observer = new IntersectionObserver(
    ([entry]) => onChange(entry.isIntersecting),
    { rootMargin: "120px" }
  );
  observer.observe(el);
  return () => observer.disconnect();
}

type Disposable = { dispose: () => void };

const isDisposable = (value: unknown): value is Disposable =>
  !!value && typeof (value as Disposable).dispose === "function";

/** Frees the GPU resources held by every mesh, line and point cloud in a scene. */
export function disposeObject(root: Object3D) {
  root.traverse((child) => {
    const { geometry, material } = child as Object3D & {
      geometry?: unknown;
      material?: unknown;
    };
    if (isDisposable(geometry)) geometry.dispose();
    (Array.isArray(material) ? material : [material]).forEach((m) => {
      if (isDisposable(m)) m.dispose();
    });
  });
}
