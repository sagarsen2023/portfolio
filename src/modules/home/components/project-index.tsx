import { useAtomValue } from "jotai";
import { PROJECTS } from "@/constants/portfolio";
import {
  activeProjectAtom,
  projectIndexVisibleAtom,
} from "../../../context/store";

/** Fixed slide counter shown beside the pinned project showcase. */
function ProjectIndex() {
  const visible = useAtomValue(projectIndexVisibleAtom);
  const active = useAtomValue(activeProjectAtom);

  return (
    <ul
      aria-hidden="true"
      className={`pointer-events-none fixed top-1/2 right-gx z-[800] flex -translate-y-1/2 flex-col gap-3 font-mono text-[11px] tracking-[.15em] [transition:opacity_.6s] mobile:hidden ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {PROJECTS.map((project, i) => (
        <li
          key={project.number}
          className={`flex items-center justify-end gap-2 [transition:color_.5s] before:h-px before:bg-fg before:content-[''] before:[transition:width_.6s_var(--ease-expo)] ${
            i === active ? "text-fg before:w-[18px]" : "text-muted before:w-0"
          }`}
        >
          {project.number}
        </li>
      ))}
    </ul>
  );
}

export default ProjectIndex;
