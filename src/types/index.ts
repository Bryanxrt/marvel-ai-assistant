export interface FilmBase {
  n: number;
  title: string;
  year: string;
  icon: string;
}

export interface Phase {
  id: number;
  name: string;
  color: string;
  films: FilmBase[];
}

export interface Film extends FilmBase {
  phase: number;
  phaseColor: string;
  phaseName: string;
  poster?: string | null;
}

export interface Hero {
  id: number;
  name: string;
  alias: string;
  icon: string;
  desc: string;
  powers: string[];
  bg: string;
  accent: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessageType {
  role: ChatRole;
  content: string;
}
