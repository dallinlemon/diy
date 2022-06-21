import { createAction, props } from '@ngrx/store';
import { BudgetMenuTypes } from 'src/app/types/budget-menu-types.enum';

export type BudgetMenu = {
  type: BudgetMenuTypes;
  display: boolean;
  id: number;
}

export interface BudgetMenuState {
  menu: BudgetMenu;
}
export const initialState: BudgetMenuState = {
  menu: {
    type: BudgetMenuTypes.BLANK,
    display: true,
    id: 0
  }
};

export const setBudgetMenu = createAction('[Budget Menu] Set Value', props<BudgetMenuState>());
export const resetBudgetMenu = createAction('[Budget Menu] Reset');
