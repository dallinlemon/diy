import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Category from "../../models/category.model";
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
  categories$: Subject<Category[]>
  private checkedCategories: Map<number, boolean> = new Map<number, boolean>();
  public checkedCategoriesSubject: Subject<number> = new Subject<number>();
  public checkedCategories$ = this.checkedCategoriesSubject.asObservable();
  constructor(
    private monthStoreService: MonthSelectionStoreService,
    private recordStoreService: RecordStoreService,
    private menuStoreService: BudgetMenuStoreService,
    ) {
    super();
  }

  public addCategories(category: Category) {
    this.logger.trace(CategoriesStoreService.name, 'addCategories', 'Setting Categories with new record');
    this.categories.push(new Category(category.id, category.group_id, category.name, category.assigned, category.created_at, category.notes));
    this.update();
  }

  public updateCategories(category: Category) {
    this.logger.trace(CategoriesStoreService.name, 'updateCategories', `was called for category ${category.id}`);
    this.categories.forEach((element, index) => {
      if (element.id === category.id) {
        this.categories[index] = new Category(category.id, category.group_id, category.name, category.assigned, category.created_at, category.notes);
      }
    });
    this.update();
  }

  public deleteCategories(categoryId: number) {
    this.logger.trace(CategoriesStoreService.name, 'deleteCategories', `was called for category ${categoryId}`);
    this.categories = this.categories.filter(element => {
      return element.id !== categoryId;
    })
    this.update();
  }

  public resetCategories() {
    this.logger.trace(CategoriesStoreService.name, 'resetCategories', 'was called');
    this.categories = [];
    this.logger.info(CategoriesStoreService.name, 'resetCategories', 'categories store was reset');
    this.update();
  }
  public setCategories(categories: Category[]) {
    this.logger.trace(CategoriesStoreService.name, 'setCategories', 'was called');
    this.categories = categories.map((category) => {
      return new Category(category.id, category.group_id, category.name, category.assigned, category.created_at, category.notes);
    });
    this.logger.info(CategoriesStoreService.name, 'setCategories', 'categories store was set');
    this.update();
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
    this.categories = this.categories.filter(element => {
      if (!element) return false;
      if (!this.checkedCategories.has(element.id)) {
        return false;
      }
      this.logger.trace(CategoriesStoreService.name, 'deleteCheckedCategories', `deleting category ${element.id}`);
      this.checkedCategories.delete(element.id);
      return true;
    });
    this.logger.info(CategoriesStoreService.name, 'deleteCheckedCategories', 'checked categories removed from store');
    this.logger.debug(CategoriesStoreService.name, 'deleteCheckedCategories', `checked categories -> `, this.checkedCategories);
    this.update();
  }

  public getCheckedCategories(): Category[] {
    this.logger.trace(CategoriesStoreService.name, 'getCheckedCategories', 'was called');
    return this.categories.filter(element => {
      if(!element) return false;
      if(!this.checkedCategories.has(element.id)) {
        return false;
      }
      return true;
    });
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
    this.update();
  }

  public getMonthsRecords(categoryId: number): Record[] {
    this.logger.trace(RecordStoreService.name, 'getMonthsRecords', 'was called');
    return this.recordStoreService.records.filter(element => {
      if (!element) return false;
      if (element.date.getUTCMonth() !== this.monthStoreService.selectedDate.getUTCMonth() || element.category_id !== categoryId) {
        return false;
      }
      return true;
    });
  }

  /**
    * Updates latest categories to subcribers to categories$
  */
  public update() {
    this.categories$.next(this.categories);
  }
}
