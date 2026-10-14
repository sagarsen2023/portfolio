import { useEffect, useState } from "react";

/**
 * Resolves once the given font faces are loaded, or after `timeout` ms so a
 * slow font CDN never blocks the page.
 */
export default function useFontsReady(fonts: string[], timeout = 2500) {
  const [ready, setReady] = useState(false);
  const fontsKey = fonts.join("|");

  useEffect(() => {
    let active = true;
    const loaded = Promise.all(
      fontsKey.split("|").map((font) => document.fonts.load(font))
    ).catch(() => undefined);
    const timedOut = new Promise((resolve) => setTimeout(resolve, timeout));

    Promise.race([loaded, timedOut]).then(() => {
      if (active) setReady(true);
    });

    return () => {
      active = false;
    };
  }, [fontsKey, timeout]);

  return ready;
}
