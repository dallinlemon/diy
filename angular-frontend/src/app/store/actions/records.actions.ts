import { createAction, props } from "@ngrx/store";
import Record from "shared/models/record.model";

export interface RecordState {
  records: Record[];
}
export const initialState: RecordState = {
  records: []
};

export const setRecords = createAction('[Records] Set Value', props<RecordState>());
export const resetRecords = createAction('[Records] Reset');
