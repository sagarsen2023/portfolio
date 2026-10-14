/**
 * Renders the social preview card, the "S." favicon and app icons into `public/`.
 *
 *   npm run seo:images
 *
 * Re-run after changing the portrait, name, role or tagline below.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement as h } from "react";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const PUBLIC = resolve(ROOT, "public");
const fromRoot = (path) => readFileSync(resolve(ROOT, path));
const font = (pkg, file) => fromRoot(`node_modules/@fontsource/${pkg}/files/${file}`);

const COLORS = {
  bg: "#050505",
  fg: "#F2EFEA",
  muted: "#8A8780",
  accent: "#A6FF00",
};

const CARD = {
  name: "Sagar Sen",
  role: "Software Engineer",
  company: "Broadifi Tech",
  headline: "Building scalable software,",
  tagline: "from pixels to infrastructure.",
  domain: "sagarsen.dev",
  disciplines: ["Frontend", "Backend", "Mobile", "AI"],
};

const WIDTH = 1200;
const HEIGHT = 630;
// The portrait is 3:4; fill the card height on the right-hand side.
const PORTRAIT_WIDTH = Math.round((HEIGHT * 3) / 4);

const asterisk = (size, color) =>
  h(
    "svg",
    { width: size, height: size, viewBox: "-50 -50 100 100", fill: color },
    ...Array.from({ length: 6 }, (_, i) =>
      h("rect", {
        key: i,
        x: -4.5,
        y: -48,
        width: 9,
        height: 96,
        rx: 4.5,
        transform: `rotate(${i * 30})`,
      })
    )
  );

function card(portrait) {
  return h(
    "div",
    {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        position: "relative",
        backgroundColor: COLORS.bg,
        backgroundImage:
          // Kept clear of the portrait so its fade meets plain background.
          "radial-gradient(circle at 0% 100%, rgba(166,255,0,0.14), rgba(5,5,5,0) 44%)",
        fontFamily: "JetBrains Mono",
        color: COLORS.fg,
      },
    },
    h("img", {
      src: portrait,
      width: PORTRAIT_WIDTH,
      height: HEIGHT,
      style: { position: "absolute", top: 0, right: 0 },
    }),
    // Fade the portrait into the background, like the hero's mask.
    h("div", {
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        width: PORTRAIT_WIDTH,
        height: HEIGHT,
        backgroundImage: `linear-gradient(to right, ${COLORS.bg} 0%, rgba(5,5,5,0) 45%)`,
      },
    }),
    h("div", {
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        width: PORTRAIT_WIDTH,
        height: HEIGHT,
        backgroundImage: `linear-gradient(to top, ${COLORS.bg} 0%, rgba(5,5,5,0) 35%)`,
      },
    }),
    h(
      "div",
      {
        style: {
          position: "absolute",
          top: 64,
          bottom: 60,
          left: 72,
          width: 820,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 18,
            letterSpacing: 4.5,
            color: COLORS.muted,
          },
        },
        h("span", { style: { color: COLORS.accent } }, "("),
        // Non-breaking spaces: Satori trims plain whitespace in flex items.
        h("span", null, ` ${CARD.role.toUpperCase()} · ${CARD.company.toUpperCase()} `),
        h("span", { style: { color: COLORS.accent } }, ")")
      ),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        h(
          "div",
          { style: { display: "flex", alignItems: "flex-start" } },
          h(
            "span",
            {
              style: {
                fontFamily: "Anton",
                fontSize: 176,
                lineHeight: 0.86,
                letterSpacing: -1,
              },
            },
            CARD.name.toUpperCase()
          ),
          h(
            "div",
            { style: { display: "flex", marginLeft: 12, marginTop: 6 } },
            asterisk(36, COLORS.accent)
          )
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 50,
              lineHeight: 1.05,
            },
          },
          h("span", null, CARD.headline),
          h("span", { style: { color: COLORS.muted } }, CARD.tagline)
        )
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 16,
            letterSpacing: 3.2,
          },
        },
        h("span", { style: { color: COLORS.accent } }, CARD.domain.toUpperCase()),
        h(
          "span",
          { style: { color: COLORS.muted } },
          CARD.disciplines.join(" · ").toUpperCase()
        )
      )
    )
  );
}

/**
 * The "S." monogram, white on black. `scale` sets the font size relative to
 * the tile; maskable app icons keep it small enough for the circular safe zone.
 */
const monogram = (size, { scale, radius = 0 }) =>
  h(
    "div",
    {
      style: {
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        borderRadius: radius,
        color: "#FFFFFF",
        fontFamily: "Anton",
        fontSize: Math.round(size * scale),
        lineHeight: 1,
      },
    },
    "S."
  );

const toPng = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();

function write(name, data) {
  writeFileSync(resolve(PUBLIC, name), data);
  console.log(`  public/${name}  ${(data.length / 1024).toFixed(1)} kB`);
}

const portrait = `data:image/jpeg;base64,${fromRoot("src/assets/portrait.jpg").toString("base64")}`;

const FONTS = [
  { name: "Anton", data: font("anton", "anton-latin-400-normal.woff"), weight: 400, style: "normal" },
  {
    name: "Instrument Serif",
    data: font("instrument-serif", "instrument-serif-latin-400-italic.woff"),
    weight: 400,
    style: "italic",
  },
  {
    name: "JetBrains Mono",
    data: font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"),
    weight: 400,
    style: "normal",
  },
];

// Satori outlines the glyphs, so the SVGs never depend on the font loading.
const render = (element, width, height = width) =>
  satori(element, { width, height, fonts: FONTS });

const svg = await render(card(portrait), WIDTH, HEIGHT);
const favicon = await render(monogram(64, { scale: 0.78, radius: 14 }), 64);
const touchIcon = await render(monogram(180, { scale: 0.62 }), 180);
const appIcon = await render(monogram(512, { scale: 0.5 }), 512);

console.log("SEO images:");
// JPEG keeps the photo-heavy card well under WhatsApp's ~300 kB preview limit.
write(
  "og-image.jpg",
  await sharp(toPng(svg, WIDTH)).jpeg({ quality: 86, mozjpeg: true }).toBuffer()
);
write("favicon.svg", Buffer.from(favicon));
write("apple-touch-icon.png", toPng(touchIcon, 180));
write("icon-192.png", toPng(appIcon, 192));
write("icon-512.png", toPng(appIcon, 512));
