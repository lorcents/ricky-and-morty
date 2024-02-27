// types.ts

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: [];
  url: string;
  created: string;
}

export interface Residents {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {};
  image: "https://rickandmortyapi.…character/avatar/38.jpeg";
  episode: [];
  url: string;
  created: string;
  notes?: string;
  location:{
    name:string;
    url:string;
  }
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [];
  url: string;
  created: string;
}

