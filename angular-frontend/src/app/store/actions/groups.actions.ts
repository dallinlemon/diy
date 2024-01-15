import Group from "../../models/group.model";

export interface GroupState {
  groups: Group[];
}
export const initialState: GroupState = {
  groups: []
};

// export const setGroups = createAction('[Groups] Set Value', props<GroupState>());
// export const resetGroups = createAction('[Groups] Reset');
