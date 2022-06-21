import { RootStore } from "../types/store.types";
import { categoriesReducer } from "./reducers/categories.reducer";
import { groupsReducer } from "./reducers/groups.reducer";
import { recordsReducer } from "./reducers/records.reducer";
import { budgetMenuReducer } from "./reducers/budget-menu.reducer";
import { monthSelectionReducer } from "./reducers/month-selection.reducer";


export const rootStore = {
  categoriesReducer,
  groupsReducer,
  recordsReducer,
  budgetMenuReducer,
  monthSelectionReducer,
} as RootStore;
