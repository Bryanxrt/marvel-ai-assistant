import type { Phase, FilmBase } from "../types";

export const PHASES: Phase[] = [
  { id:1, name:"FASE 1", color:"#3B82F6", films:[
    { n:1,  title:"Capitão América: O Primeiro Vingador", year:"1943", icon:"🛡️" },
    { n:2,  title:"Capitã Marvel",                        year:"1995", icon:"⭐" },
    { n:3,  title:"Homem de Ferro",                       year:"2008", icon:"🔴" },
    { n:4,  title:"Homem de Ferro 2",                     year:"2010", icon:"🔴" },
    { n:5,  title:"O Incrível Hulk",                      year:"2011", icon:"💚" },
    { n:6,  title:"Thor",                                  year:"2011", icon:"⚡" },
    { n:7,  title:"Os Vingadores",                        year:"2012", icon:"🅰️" },
  ]},
  { id:2, name:"FASE 2", color:"#8B5CF6", films:[
    { n:8,  title:"Homem de Ferro 3",                            year:"2013", icon:"🔴" },
    { n:9,  title:"Thor: O Mundo Sombrio",                       year:"2013", icon:"⚡" },
    { n:10, title:"Capitão América: O Soldado Invernal",         year:"2014", icon:"🛡️" },
    { n:11, title:"Guardiões da Galáxia",                        year:"2014", icon:"🌌" },
    { n:12, title:"Guardiões da Galáxia Vol. 2",                 year:"2017", icon:"🌌" },
    { n:13, title:"Vingadores: Era de Ultron",                   year:"2015", icon:"🅰️" },
    { n:14, title:"Homem-Formiga",                               year:"2015", icon:"🐜" },
  ]},
  { id:3, name:"FASE 3", color:"#F97316", films:[
    { n:15, title:"Capitão América: Guerra Civil",               year:"2016", icon:"🛡️" },
    { n:16, title:"Viúva Negra",                                 year:"2021", icon:"🕷️" },
    { n:17, title:"Pantera Negra",                               year:"2018", icon:"🐾" },
    { n:18, title:"Homem-Aranha: De Volta ao Lar",               year:"2017", icon:"🕸️" },
    { n:19, title:"Doutor Estranho",                             year:"2016", icon:"✨" },
    { n:20, title:"Thor: Ragnarok",                              year:"2017", icon:"⚡" },
    { n:21, title:"Homem-Formiga e a Vespa",                     year:"2018", icon:"🐜" },
    { n:22, title:"Vingadores: Guerra Infinita",                 year:"2018", icon:"💜" },
    { n:23, title:"Vingadores: Ultimato",                        year:"2019", icon:"🅰️" },
  ]},
  { id:4, name:"FASE 4", color:"#10B981", films:[
    { n:24, title:"Shang-Chi e a Lenda dos Dez Anéis",           year:"2021", icon:"☯️" },
    { n:25, title:"Eternos",                                     year:"2021", icon:"🌟" },
    { n:26, title:"Homem-Aranha: Longe de Casa",                 year:"2019", icon:"🕸️" },
    { n:27, title:"Homem-Aranha: Sem Volta para Casa",           year:"2021", icon:"🕸️" },
    { n:28, title:"Doutor Estranho: Multiverso da Loucura",      year:"2022", icon:"✨" },
    { n:29, title:"Thor: Amor e Trovão",                         year:"2022", icon:"⚡" },
    { n:30, title:"Pantera Negra: Wakanda para Sempre",          year:"2022", icon:"🐾" },
  ]},
  { id:5, name:"FASE 5", color:"#EAB308", films:[
    { n:31, title:"Homem-Formiga e a Vespa: Quantumania",        year:"2023", icon:"🐜" },
    { n:32, title:"Guardiões da Galáxia Vol. 3",                 year:"2023", icon:"🌌" },
    { n:33, title:"As Marvels",                                  year:"2023", icon:"⭐" },
    { n:34, title:"Deadpool & Wolverine",                        year:"2024", icon:"⚔️" },
    { n:35, title:"Capitão América: Admirável Mundo Novo",       year:"2025", icon:"🛡️" },
    { n:36, title:"Thunderbolts*",                               year:"2025", icon:"⚡" },
  ]},
];

export const UPCOMING: FilmBase[] = [
  { n:37, title:"Quarteto Fantástico: Primeiros Passos", year:"2025", icon:"4️⃣" },
  { n:38, title:"Vingadores: Dia do Juízo",               year:"2026", icon:"🅰️" },
  { n:39, title:"Vingadores: Guerras Secretas",           year:"2027", icon:"🅰️" },
];

/** Lista plana de todos os filmes já enriquecida com dados da fase. */
export const allFilms = () =>
  PHASES.flatMap((ph) =>
    ph.films.map((f) => ({
      ...f,
      phase: ph.id,
      phaseColor: ph.color,
      phaseName: ph.name,
    }))
  );
