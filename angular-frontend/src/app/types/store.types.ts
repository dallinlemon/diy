import { Action, ActionReducer } from "@ngrx/store";
import { BudgetMenuState } from "../store/actions/budget-menu.actions";
import { CategoryState } from "../store/actions/categories.actions";
import { GroupState } from "../store/actions/groups.actions";
import { RecordState } from "../store/actions/records.actions";

export type RootStore = {
  categoriesReducer: ActionReducer<CategoryState, Action>;
  groupsReducer: ActionReducer<GroupState, Action>;
  recordsReducer: ActionReducer<RecordState, Action>;
  budgetMenuReducer: ActionReducer<BudgetMenuState, Action>;
}
export type RootStoreInjection = {
  categoriesReducer: CategoryState;
  groupsReducer: GroupState;
  recordsReducer: RecordState;
  budgetMenuReducer: BudgetMenuState;
}

