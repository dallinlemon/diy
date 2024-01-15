import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import Category from "../../models/category.model";
import { CategoryState, resetCategories, setCategories } from "src/app/store/actions/categories.actions";
import { RootStoreInjection } from "src/app/types/store.types";
import { BaseService } from "../base-service";
import { MonthSelectionStoreService } from "./month-selection-store.service";
import Record from "../../models/record.model";
import { RecordStoreService } from "./record-store.service";
import { BudgetMenuStoreService } from "./budget-menu.service";
import { BudgetMenuTypes } from "src/app/types/budget-menu-types.enum";

@Injectable({
  providedIn: 'root'
})
export class CategoriesStoreService extends BaseService {
  categories: Category[] =[];
  categories$: Observable<CategoryState>
  private checkedCategories: Map<number, boolean> = new Map<number, boolean>();
  public checkedCategoriesSubject: Subject<number> = new Subject<number>();
  public checkedCategories$ = this.checkedCategoriesSubject.asObservable();
  constructor(
    private monthStoreService: MonthSelectionStoreService,
    private recordStoreService: RecordStoreService,
    private menuStoreService: BudgetMenuStoreService,
    ) {
    super();
    // this.categories$ = store.select('categoriesReducer');
    this.categories$.subscribe((Categories: CategoryState) => {
      this.logger.trace(CategoriesStoreService.name, 'subscription', 'was called');
      this.categories = [...Categories.categories];
    });
  }

  public addCategories(category: Category) {
    this.logger.trace(CategoriesStoreService.name, 'addCategories', 'Setting Categories with new record');
    this.setCategories([...this.categories, new Category(category.id, category.group_id, category.name, category.assigned, category.created_at, category.notes)]);
  }

  public updateCategories(category: Category) {
    this.logger.trace(CategoriesStoreService.name, 'updateCategories', `was called for category ${category.id}`);
    this.categories.forEach((element, index) => {
      if (element.id === category.id) {
        this.categories[index] = new Category(category.id, category.group_id, category.name, category.assigned, category.created_at, category.notes);
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
    // this.store.dispatch(resetCategories());
    this.logger.info(CategoriesStoreService.name, 'resetCategories', 'categories store was reset');
  }
  public setCategories(categories: Category[]) {
    this.logger.trace(CategoriesStoreService.name, 'setCategories', 'was called');
    // this.store.dispatch(setCategories({ categories: categories }));
    this.logger.info(CategoriesStoreService.name, 'setCategories', 'categories store was set');
  }

  public checkCategory(categoryId: number, checked: boolean) {
    this.logger.trace(CategoriesStoreService.name, 'checkCategory', `was called with ${categoryId} and ${checked}`);
    this.checkedCategories.set(categoryId, checked);
    this.menuStoreService.setBudgetMenuType(BudgetMenuTypes.CATEGORY);
    this.checkedCategoriesSubject.next(this.totalChecked());
    this.logger.debug(CategoriesStoreService.name, 'checkCategory', `checked categories -> `, this.checkedCategories);
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

  public getCheckedCategories(): Category[] {
    this.logger.trace(CategoriesStoreService.name, 'getCheckedCategories', 'was called');
    const result: Category[] = [];
    this.checkedCategories.forEach((value, key) => {
      if (value && key) {
        result.push(this.categories.find(element => element.id === key) as Category); // as Category because this should alway find a category and never return undefined
      }
    });
    return result;
  }


  private totalChecked(): number {
    let total: number = 0;
    this.checkedCategories.forEach((value, key) => {
      if (value) {
        total++;
      }
    });
    return total;
  }

  public getAssigned(categoryId: number, date?: Date): number {
    this.logger.trace(CategoriesStoreService.name, 'getAssigned', `was called for ${categoryId} @ ${date}`);
    let assigned: number = 0;
    this.categories.forEach(category => {
      if (category.id === categoryId) {
        assigned = category.getAssigned(date ?? this.monthStoreService.selectedDate ?? new Date());
      }
    });
    return assigned;
  }

  public setAssigned(categoryId: number, amount: number, date?: string) {
    this.logger.trace(CategoriesStoreService.name, 'setAssigned', `was called for ${date}, ${amount}`);
    this.categories.forEach(category => {
      if (category.id === categoryId) {
        category.assigned.set(date ?? this.monthStoreService.selectedDateString, amount);
      }
    });
    this.setCategories(this.categories);
  }

  public getMonthsRecords(categoryId: number): Record[] {
    this.logger.trace(RecordStoreService.name, 'getMonthsRecords', 'was called');
    const months: Record[] = [];
    this.recordStoreService.records.forEach(element => {
      if (element.date.getUTCMonth() === this.monthStoreService.selectedDate.getUTCMonth() && element.category_id === categoryId) {
        months.push(element);
      }
    }
    );
    this.logger.debug(RecordStoreService.name, 'getMonthsRecords', `months -> `, months);
    return months;
  }
}
