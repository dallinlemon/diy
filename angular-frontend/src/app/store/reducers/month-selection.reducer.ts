import { createReducer, on } from "@ngrx/store";
import { initialState } from "../actions/month-selection.actions";
import * as MonthSelectionActions from "../actions/month-selection.actions";

export const monthSelectionReducer = createReducer(
  initialState,
  on(MonthSelectionActions.resetMonthSelection, state => ({...state, selectedDate: initialState.selectedDate})),
  on(MonthSelectionActions.setMonthSelection, (state, newState) => ({...state, selectedDate: newState.selectedDate }))
);
