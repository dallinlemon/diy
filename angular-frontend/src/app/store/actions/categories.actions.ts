import { createAction, props } from '@ngrx/store';
import Category from '../../models/category.model';

export interface CategoryState {
  categories: Category[];
}
export const initialState: CategoryState = {
  categories: []
};

export const setCategories = createAction('[Categories] Set Value', props<CategoryState>());
export const resetCategories = createAction('[Categories] Reset');
