import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/groups.actions';
import { initialState } from '../actions/groups.actions';


export const groupsReducer = createReducer(
  initialState,
  on(CategoryActions.resetGroups, state => ({...state, groups: []})),
  on(CategoryActions.setGroups, (state, newState) => ({...state, groups: newState.groups }))
);
