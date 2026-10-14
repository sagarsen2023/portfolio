import { useAtomValue } from "jotai";
import { PROFILE } from "@/constants/portfolio";
import { projectIndexVisibleAtom } from "../../../context/store";

/** Edge-docked "available for work" pill; slides away while the project index shows. */
function AvailabilityBadge() {
  const hidden = useAtomValue(projectIndexVisibleAtom);

  // The outer wrapper owns positioning so the magnetic pull (a GSAP transform
  // on the link) never fights the CSS translate.
  return (
    <div
      className={`fixed top-1/2 right-0 z-[800] -translate-y-1/2 [transition:translate_.7s_var(--ease-expo)] ${
        hidden ? "translate-x-[110%]" : ""
      }`}
    >
      <a
        href="#contact"
        data-magnetic
        aria-label="Available for work"
        className="group flex h-[46px] items-center rounded-l-full bg-fg pr-4 pl-[18px] text-surface-0 hover:text-surface-0"
      >
        <span className="font-display text-[20px] leading-none">
          {PROFILE.name[0]}.
        </span>
        <span className="flex max-w-0 items-center gap-2 overflow-hidden font-mono text-[10px] tracking-[.2em] whitespace-nowrap uppercase [transition:max-width_.7s_var(--ease-expo),margin_.7s_var(--ease-expo)] before:size-1.5 before:flex-none before:rounded-full before:bg-[#2c7a00] before:content-[''] group-hover:ml-3 group-hover:max-w-[220px]">
          Available for work
        </span>
      </a>
    </div>
  );
}

export default AvailabilityBadge;
