import { RootStore } from "../types/store.types";
import { categoriesReducer } from "./reducers/categories.reducer";
import { groupsReducer } from "./reducers/groups.reducer";

export const rootStore = {
  categoriesReducer,
  groupsReducer
} as RootStore;
