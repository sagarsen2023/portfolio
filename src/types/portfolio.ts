export interface NavItem {
  label: string;
  href: string;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  tagline: string;
}

export interface Project {
  number: string;
  name: string;
  category: string;
  title: string;
  description: string;
  liveUrl: string;
  /** Screenshot URL. When empty, a hue-tinted placeholder is rendered instead. */
  image?: string;
  /** Section background shown while this project is active. */
  background: string;
  /** Placeholder hue (oklch degrees). */
  hue: number;
}

/** A run of text; emphasised runs get the accent treatment when split into words. */
export interface TextSegment {
  text: string;
  emphasis?: boolean;
}
