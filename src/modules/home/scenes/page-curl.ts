/**
 * 2D page curl, as in book-flip widgets: the page is cut along a fold line and
 * the part beyond it is mirrored back over the page as the back of the paper.
 *
 * The fold is driven by where the page's corner has been pulled to. `turned`
 * runs from 0 (lying flat) to 1 (turned over past the left edge).
 *
 * Per frame it only writes clip paths, transforms and opacities: the paper's
 * gradient is painted once and stretched, and nothing is blurred.
 */

type Point = { x: number; y: number };

/** Which corner leads the turn. */
export type Corner = "bottom" | "top";

export interface CurlElements {
  /** The whole page; hidden once it has been turned over completely. */
  page: HTMLElement;
  /** The printed front, clipped to the part still lying flat. */
  sheet: HTMLElement;
  /** A point on the fold line, rotated so its x axis crosses the fold. */
  fold: HTMLElement;
  /** Back of the paper, mirrored over the front (clipped to its outline). */
  flap: HTMLElement;
  /** The paper's shading inside the flap, stretched to the flap's depth. */
  paper: HTMLElement;
  /** Shadow the lifted paper casts onto the page underneath. */
  cast: HTMLElement;
}

// How far the leading corner arcs away from its edge mid-turn (× page height).
const CORNER_ARC: Record<Corner, number> = { bottom: -0.3, top: 0.22 };
const EPSILON = 0.0005;

// Dark paper: shaded where it bends, with a faint sheen a little further out.
const PAPER_SHADING = `linear-gradient(90deg,
  color-mix(in srgb, var(--pbg) 80%, #000) 0%,
  color-mix(in srgb, var(--pbg) 95%, #f2efea) 10%,
  color-mix(in srgb, var(--pbg) 86%, #f2efea) 38%,
  color-mix(in srgb, var(--pbg) 94%, #f2efea) 78%,
  color-mix(in srgb, var(--pbg) 97%, #f2efea) 100%)`;
const CAST_SHADOW = "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.6))";

/** Keeps the part of a convex polygon where `side(p) >= 0`. */
function clipPolygon(points: Point[], side: (p: Point) => number) {
  const kept: Point[] = [];
  points.forEach((a, i) => {
    const b = points[(i + 1) % points.length];
    const da = side(a);
    const db = side(b);
    if (da >= 0) kept.push(a);
    if (da >= 0 !== db >= 0) {
      const t = da / (da - db);
      kept.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  });
  return kept;
}

const toPolygon = (points: Point[]) =>
  `polygon(${points.map((p) => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`).join(",")})`;

/** Sizes the fold layers (and paints their gradients) for a `width` × `height` page. */
export function sizeCurl(els: CurlElements, width: number, height: number) {
  const reach = Math.hypot(width, height);
  const castWidth = Math.round(width * 0.2);
  Object.assign(els.flap.style, {
    left: "0px",
    top: `${-reach}px`,
    width: `${reach}px`,
    height: `${reach * 2}px`,
  });
  Object.assign(els.paper.style, {
    position: "absolute",
    inset: "0",
    background: PAPER_SHADING,
    transformOrigin: "0 0",
  });
  Object.assign(els.cast.style, {
    left: `${-castWidth}px`,
    top: `${-reach}px`,
    width: `${castWidth}px`,
    height: `${reach * 2}px`,
    background: CAST_SHADOW,
  });
}

/** Draws the page at `turned`, curling from `corner`. */
export function renderCurl(
  els: CurlElements,
  turned: number,
  corner: Corner,
  width: number,
  height: number,
) {
  const { page, sheet, fold, flap, paper, cast } = els;

  if (turned >= 1 - EPSILON) {
    page.style.visibility = "hidden";
    return;
  }
  page.style.visibility = "";
  if (turned <= EPSILON) {
    sheet.style.clipPath = "";
    fold.style.visibility = "hidden";
    return;
  }

  // The corner is pulled across to the far side of the left edge, arcing
  // away from its own edge on the way.
  const origin: Point = { x: width, y: corner === "bottom" ? height : 0 };
  const lift = Math.sin(Math.PI * turned);
  const pulled: Point = {
    x: width - 2 * width * turned,
    y: origin.y + CORNER_ARC[corner] * height * lift,
  };

  // The fold is the perpendicular bisector of the corner's old and new spots.
  const mid = { x: (origin.x + pulled.x) / 2, y: (origin.y + pulled.y) / 2 };
  const length = Math.hypot(pulled.x - origin.x, pulled.y - origin.y);
  const across = {
    x: (pulled.x - origin.x) / length,
    y: (pulled.y - origin.y) / length,
  };
  const along = { x: -across.y, y: across.x };

  // Fold space: x crosses the fold (positive towards the flat part), y runs along it.
  const toFold = (p: Point) => ({
    x: (p.x - mid.x) * across.x + (p.y - mid.y) * across.y,
    y: (p.x - mid.x) * along.x + (p.y - mid.y) * along.y,
  });
  const toPage = (p: Point) => ({
    x: mid.x + p.x * across.x + p.y * along.x,
    y: mid.y + p.x * across.y + p.y * along.y,
  });

  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ].map(toFold);
  const flat = clipPolygon(corners, (p) => p.x);
  const lifted = clipPolygon(corners, (p) => -p.x);
  // Mirroring across the fold lays the lifted part back over the page.
  const back = lifted.map((p) => ({ x: -p.x, y: p.y }));
  const depth = Math.max(1, ...back.map((p) => p.x));
  const reach = Math.hypot(width, height);

  sheet.style.clipPath = toPolygon(flat.map(toPage));

  fold.style.visibility = "visible";
  fold.style.transform = `translate(${mid.x.toFixed(1)}px, ${mid.y.toFixed(1)}px) rotate(${Math.atan2(across.y, across.x)}rad)`;

  flap.style.clipPath = toPolygon(back.map((p) => ({ x: p.x, y: p.y + reach })));
  paper.style.transform = `scaleX(${depth / reach})`;
  cast.style.opacity = String(lift);
}

/** Clears everything the curl wrote. */
export function resetCurl(els: CurlElements) {
  els.page.style.visibility = "";
  els.sheet.style.clipPath = "";
  els.fold.style.cssText = "";
  els.flap.style.cssText = "";
  els.paper.style.cssText = "";
  els.cast.style.cssText = "";
}
