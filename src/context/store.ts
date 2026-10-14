import { atom } from "jotai";

/** Index of the project slide currently in view. */
export const activeProjectAtom = atom(0);

/** True while the work section is on screen; swaps the availability badge for the project index. */
export const projectIndexVisibleAtom = atom(false);
