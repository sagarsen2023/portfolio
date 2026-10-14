/**
 * 2D page curl, as in book-flip widgets: the page is cut along a fold line and
 * the part beyond it is mirrored back over the page as the back of the paper.
 *
 * The fold is driven by where the page's corner has been pulled to. `turned`
 * runs from 0 (lying flat) to 1 (turned over past the left edge).
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
  /** Back of the paper, mirrored over the front. */
  flap: HTMLElement;
  /** Shadow the lifted paper casts onto the page underneath. */
  cast: HTMLElement;
}

// How far the leading corner arcs away from its edge mid-turn (× page height).
const CORNER_ARC: Record<Corner, number> = { bottom: -0.3, top: 0.22 };
const EPSILON = 0.0005;

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
  `polygon(${points.map((p) => `${p.x}px ${p.y}px`).join(",")})`;

/** Sizes the fold layers for a page of `width` × `height`. */
export function sizeCurl(els: CurlElements, width: number, height: number) {
  const reach = Math.hypot(width, height);
  const castWidth = Math.round(width * 0.2);
  Object.assign(els.flap.style, {
    left: "0px",
    top: `${-reach}px`,
    width: `${reach}px`,
    height: `${reach * 2}px`,
  });
  Object.assign(els.cast.style, {
    left: `${-castWidth}px`,
    top: `${-reach}px`,
    width: `${castWidth}px`,
    height: `${reach * 2}px`,
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
  const { page, sheet, fold, flap, cast } = els;

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
  fold.style.transform = `translate(${mid.x}px, ${mid.y}px) rotate(${Math.atan2(across.y, across.x)}rad)`;

  flap.style.clipPath = toPolygon(back.map((p) => ({ x: p.x, y: p.y + reach })));
  // Dark paper: shaded where it bends, with a faint sheen a little further out.
  flap.style.background = `linear-gradient(90deg,
    color-mix(in srgb, var(--pbg) 80%, #000) 0px,
    color-mix(in srgb, var(--pbg) 95%, #f2efea) ${depth * 0.1}px,
    color-mix(in srgb, var(--pbg) 86%, #f2efea) ${depth * 0.38}px,
    color-mix(in srgb, var(--pbg) 94%, #f2efea) ${depth * 0.78}px,
    color-mix(in srgb, var(--pbg) 97%, #f2efea) ${depth}px)`;

  cast.style.background = `linear-gradient(90deg, transparent, rgba(0, 0, 0, ${0.6 * lift}))`;
}

/** Clears everything the curl wrote. */
export function resetCurl(els: CurlElements) {
  els.page.style.visibility = "";
  els.sheet.style.clipPath = "";
  els.fold.style.cssText = "";
  els.flap.style.cssText = "";
  els.cast.style.cssText = "";
}
