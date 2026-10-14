import { Fragment } from "react";
import type { TextSegment } from "@/types/portfolio";
import splitWords from "@/utils/split-words";

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
        className={`inline-block will-change-[transform,filter] ${
          word.emphasis ? emphasisClassName : ""
        }`}
      >
        {word.text}
      </span>
    </Fragment>
  ));
}

export default RevealWords;
