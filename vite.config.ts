import { defineConfig, loadEnv, type Plugin } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/** Emits robots.txt and sitemap.xml pointing at the public site URL. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: "seo-files",
    apply: "build",
    generateBundle() {
      if (!siteUrl) {
        this.warn("VITE_SITE_URL is not set; skipping robots.txt and sitemap.xml");
        return;
      }
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname);
  const siteUrl = (env.VITE_SITE_URL ?? "").replace(/\/+$/, "");

  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      seoFiles(siteUrl),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});
