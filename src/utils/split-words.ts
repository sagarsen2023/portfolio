import type { TextSegment } from "@/types/portfolio";

export interface WordToken {
  text: string;
  emphasis: boolean;
  /** Whether whitespace preceded this word in the source text. */
  spaceBefore: boolean;
}

/**
 * Splits text segments into words while remembering where the whitespace was,
 * so punctuation that follows an emphasised run stays glued to it.
 */
export default function splitWords(segments: TextSegment[]): WordToken[] {
  const tokens: WordToken[] = [];
  let pendingSpace = false;

  segments.forEach(({ text, emphasis = false }) => {
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        pendingSpace = true;
        return;
      }
      tokens.push({
        text: part,
        emphasis,
        spaceBefore: pendingSpace && tokens.length > 0,
      });
      pendingSpace = false;
    });
  });

  return tokens;
}
