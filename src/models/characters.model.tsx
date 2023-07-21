export interface CharacterUI {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  url: string;
  id: string;
}

export interface CharacterDTO {
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  name: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
  _id: string;
}

export interface CharactersDTO {
  docs: CharacterDTO[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
}
