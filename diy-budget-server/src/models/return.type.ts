import { Statement } from "sqlite";

// TODO add compo doc to this
export type ReturnType = {
  stmt: Statement,
  lastID: number,
  changes: number
};
