import { createReducer, on } from "@ngrx/store";
import * as RecordActions from '../actions/records.actions';
import { initialState } from "../actions/records.actions";

export const recordsReducer = createReducer(
  initialState,
  on(RecordActions.resetRecords, state => ({...state, groups: []})),
  on(RecordActions.setRecords, (state, newState) => ({...state, records: newState.records }))
);
