import { BudgetMenuTypes } from 'src/app/types/budget-menu-types.enum';

export type BudgetMenu = {
  type: BudgetMenuTypes;
  display: boolean;
}

export interface BudgetMenuState {
  menu: BudgetMenu;
}
export const initialState: BudgetMenuState = {
  menu: {
    type: BudgetMenuTypes.CATEGORY,
    display: true,
  }
};

// export const setBudgetMenu = createAction('[Budget Menu] Set Value', props<BudgetMenuState>());
// export const resetBudgetMenu = createAction('[Budget Menu] Reset');
