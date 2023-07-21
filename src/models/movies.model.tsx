export interface MoviesUI {
  name: string;
  score: number;
  runtime: number;
  budget: number;
  revenue: number;
  nominations: number;
  wins: number;
  id: string;
}

export interface MovieDTO {
  academyAwardNominations: number;
  academyAwardWins: number;
  boxOfficeRevenueInMillions: number;
  budgetInMillions: number;
  name: string;
  rottenTomatoesScore: number;
  runtimeInMinutes: number;
  _id: string;
}

export interface MoviesDTO {
  docs: MovieDTO[];
  limit: number;
  offset: number;
  page: number;
  pages: number;
  total: number;
}
