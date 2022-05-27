import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import Category from "shared/models/category.model";
import { CategoryState, resetCategories, setCategories } from "src/app/store/actions/categories.actions";
import { RootStoreInjection } from "src/app/types/store.types";
import { BaseService } from "../base-service";


@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService extends BaseService {
  categories: Category[] =[];
  categories$: Observable<CategoryState>
  checkedCategories: Map<number, boolean> = new Map<number, boolean>();

  constructor(private store: Store<RootStoreInjection>) {
    super();
    this.categories$ = store.select('categoriesReducer');
    this.categories$.subscribe((Categories: CategoryState) => {
      this.logger.trace(CategoriesStoreService.name, 'subscription', 'was called');
      this.categories = [...Categories.categories];
    });
  }

  public addCategories(category: Category) {
    this.logger.trace(CategoriesStoreService.name, 'addCategories', 'Setting Categories with new record');
    this.setCategories([...this.categories, category]);
  }

  public updateCategories(category: Category) {
    this.logger.trace(CategoriesStoreService.name, 'updateCategories', `was called for category ${category.id}`);
    this.categories.forEach((element, index) => {
      if (element.id === category.id) {
        this.categories[index] = category;
      }
    });
    this.setCategories(this.categories);
  }

  public deleteCategories(categoryId: number) {
    this.logger.trace(CategoriesStoreService.name, 'deleteCategories', `was called for category ${categoryId}`);
    const updatedCategories: Category[] = this.categories.filter(element => {
      return element.id !== categoryId;
    })
    this.setCategories(updatedCategories);
  }

  public resetCategories() {
    this.logger.trace(CategoriesStoreService.name, 'resetCategories', 'was called');
    this.store.dispatch(resetCategories());
    this.logger.info(CategoriesStoreService.name, 'resetCategories', 'categories store was reset');
  }
  public setCategories(categories: Category[]) {
    this.logger.trace(CategoriesStoreService.name, 'setCategories', 'was called');
    this.store.dispatch(setCategories({ categories: categories }));
    this.logger.info(CategoriesStoreService.name, 'setCategories', 'categories store was set');
  }

  public checkCategories(categoryId: number, checked: boolean) {
    this.logger.trace(CategoriesStoreService.name, 'checkCategories', `was called with ${categoryId} and ${checked}`);
    this.checkedCategories.set(categoryId, checked);
    this.logger.debug(CategoriesStoreService.name, 'checkCategories', `checked categories -> `, this.checkedCategories);
  }

  public deleteCheckedCategories() {
    this.logger.trace(CategoriesStoreService.name, 'deleteCheckedCategories', 'was called');
    this.logger.debug(CategoriesStoreService.name, 'deleteCheckedCategories', `checked categories -> `, this.checkedCategories);

    this.checkedCategories.forEach((value, key) => {
      if (!value) return;
      this.logger.trace(CategoriesStoreService.name, 'deleteCheckedCategories', `deleting category ${key}`);
      this.deleteCategories(key);
      this.checkedCategories.delete(key);

    });
    this.logger.info(CategoriesStoreService.name, 'deleteCheckedCategories', 'checked categories removed from store');
    this.logger.debug(CategoriesStoreService.name, 'deleteCheckedCategories', `checked categories -> `, this.checkedCategories);
  }
}
