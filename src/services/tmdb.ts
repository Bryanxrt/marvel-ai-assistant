// ════════════════════════════════════════════════════════════
//  TMDB API SERVICE
//  https://developer.themoviedb.org/reference/intro/getting-started
// ════════════════════════════════════════════════════════════

// CHAVE CHUMBADA DIRETO NO CÓDIGO PARA A REUNIÃO (Botão de Pânico)
const API_KEY = "cb0f64d816c76f8e98581dc6a5800ec9"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export const MARVEL_STUDIOS_COMPANY_ID = 420;

interface TmdbMovieResult {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
}

interface TmdbSearchResponse {
  results: TmdbMovieResult[];
  total_pages?: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  rating: number;
  poster: string | null;
  backdrop: string | null;
  releaseDate: string;
}

// Cache em memória — evita repetir a mesma busca várias vezes
const posterCache = new Map<string, string | null>();

/** Busca o pôster de um filme pelo título (+ ano opcional). */
export async function getMoviePoster(title: string, year?: string): Promise<string | null> {
  if (!API_KEY) {
    console.warn("[TMDB] API Key não configurada");
    return null;
  }

  const cacheKey = `${title}|${year ?? ""}`;
  if (posterCache.has(cacheKey)) return posterCache.get(cacheKey)!;

  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      query: title,
      language: "pt-BR",
      ...(year ? { year } : {}),
    });

    const res = await fetch(`${BASE_URL}/search/movie?${params.toString()}`);
    if (!res.ok) throw new Error(`TMDB respondeu ${res.status}`);

    const data: TmdbSearchResponse = await res.json();
    const best = data.results?.[0];
    const url = best?.poster_path ? `${IMG_BASE}${best.poster_path}` : null;

    posterCache.set(cacheKey, url);
    return url;
  } catch (err) {
    console.error(`[TMDB] Falha ao buscar "${title}":`, (err as Error).message);
    posterCache.set(cacheKey, null);
    return null;
  }
}

/** Busca detalhes completos de um filme (sinopse, nota, pôster, backdrop). */
export async function getMovieDetails(title: string, year?: string): Promise<MovieDetails | null> {
  if (!API_KEY) return null;
  try {
    const params = new URLSearchParams({
      api_key: API_KEY,
      query: title,
      language: "pt-BR",
      ...(year ? { year } : {}),
    });
    const res = await fetch(`${BASE_URL}/search/movie?${params.toString()}`);
    const data: TmdbSearchResponse = await res.json();
    const movie = data.results?.[0];
    if (!movie) return null;

    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      poster: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
      backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
      releaseDate: movie.release_date,
    };
  } catch (err) {
    console.error(`[TMDB] Falha ao buscar detalhes de "${title}":`, (err as Error).message);
    return null;
  }
}