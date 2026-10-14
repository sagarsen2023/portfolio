import { Fragment } from "react";
import type { TextSegment } from "@/types/portfolio";
import { isLowEndDevice } from "@/utils/media";
import splitWords from "@/utils/split-words";

// Blurred words animate best on their own GPU layer; budget devices skip the
// blur (see useWordReveal), so they skip the extra layers too.
const WORD = isLowEndDevice
  ? "inline-block"
  : "inline-block will-change-[transform,filter]";

type RevealWordsProps = {
  text: string | TextSegment[];
  /** Classes for words from emphasised segments. */
  emphasisClassName?: string;
};

/**
 * Renders text as inline-block words that `useWordReveal` animates as the
 * surrounding element scrolls into view.
 */
function RevealWords({ text, emphasisClassName = "" }: RevealWordsProps) {
  const words = splitWords(typeof text === "string" ? [{ text }] : text);

  return words.map((word, i) => (
    <Fragment key={i}>
      {word.spaceBefore && " "}
      <span
        data-reveal-word
        className={`${WORD} ${word.emphasis ? emphasisClassName : ""}`}
      >
        {word.text}
      </span>
    </Fragment>
  ));
}

export default RevealWords;
