import { Comic } from "./Comic";

export interface Issue {
  id: number;
  title: string;
  series: Comic;
  issueNr: number;
  publicationDate: string;
  pageCount: number;
}
