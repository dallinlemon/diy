import { Statement } from "sqlite";

export type ReturnType = {
  stmt: Statement,
  lastID: number,
  changes: number
};
