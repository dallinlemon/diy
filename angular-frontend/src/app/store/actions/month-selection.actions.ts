import { createAction, props } from "@ngrx/store";

export interface MonthSelectionState {
  selectedDate: Date;
}
export const initialState: MonthSelectionState = {
  selectedDate: new Date()
};

export const setMonthSelection = createAction('[Month Selection] Set Value', props<MonthSelectionState>());
export const resetMonthSelection = createAction('[Month Selection] Reset');
