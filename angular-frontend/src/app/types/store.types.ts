import { Action, ActionReducer } from "@ngrx/store";
import { CategoryState } from "../store/actions/categories.actions";
import { GroupState } from "../store/actions/groups.actions";

export type RootStore = {
  categoriesReducer: ActionReducer<CategoryState, Action>;
  groupsReducer: ActionReducer<GroupState, Action>;
}
export type RootStoreInjection = {
  categoriesReducer: CategoryState;
  groupsReducer: GroupState;
}

