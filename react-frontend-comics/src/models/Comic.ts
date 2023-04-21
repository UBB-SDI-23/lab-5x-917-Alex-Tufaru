import { Issue } from "./Issue";

export interface Comic {
  id: number;
  name: string;
  issuesNr: number;
  issues: Issue[];
  author: string;
  publisher: string;
}
