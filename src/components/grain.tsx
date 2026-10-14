import { useEffect, useRef } from "react";

const TILE = 180;

/** Animated film-grain overlay rendered from a generated noise tile. */
function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = TILE;
    const ctx = canvas.getContext("2d");
    if (!ctx || !ref.current) return;

    const noise = ctx.createImageData(TILE, TILE);
    for (let i = 0; i < noise.data.length; i += 4) {
      const value = Math.random() * 255;
      noise.data[i] = noise.data[i + 1] = noise.data[i + 2] = value;
      noise.data[i + 3] = 255;
    }
    ctx.putImageData(noise, 0, 0);
    ref.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed -top-full -left-full z-[9900] h-[300%] w-[300%] animate-grain opacity-[.045] motion-reduce:animate-none"
    />
  );
}

export default Grain;
