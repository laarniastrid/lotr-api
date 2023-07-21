export interface QuoteUI {
  name: string;
  dialog: string;
  movie: string;
  id: string;
}

export interface QuoteDTO {
  character: string;
  dialog: string;
  movie: string;
  _id: string;
}

export interface QuotesDTO {
  docs: QuoteDTO[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
}
