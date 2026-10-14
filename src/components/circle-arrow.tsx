type CircleArrowProps = {
  arrow: string;
  size?: "md" | "sm";
  /** Slide a fresh arrow in from the left when the parent `group` is hovered. */
  slide?: boolean;
};

/**
 * Round arrow badge used inside link CTAs. The parent link must carry the
 * `group` class so the badge can react to its hover state.
 */
function CircleArrow({ arrow, size = "md", slide = false }: CircleArrowProps) {
  return (
    <span
      data-magnetic
      className={`grid flex-none place-items-center overflow-hidden rounded-full border border-[rgba(242,239,234,.35)] font-serif [transition:border-color_.4s,background_.4s] group-hover:border-accent group-hover:bg-[rgba(166,255,0,.06)] ${
        size === "md" ? "size-[60px] text-[22px]" : "size-[52px] text-[18px]"
      }`}
    >
      <span
        data-a={arrow}
        className={`relative block [transition:translate_.6s_var(--ease-expo)] after:absolute after:top-0 after:-left-[46px] after:content-[attr(data-a)] ${
          slide ? "group-hover:translate-x-[46px]" : ""
        }`}
      >
        {arrow}
      </span>
    </span>
  );
}

export default CircleArrow;
