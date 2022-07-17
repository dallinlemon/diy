import { Component, OnInit } from "@angular/core";
import Category from "src/app/models/category.model";
import { CategoriesStoreService } from "src/app/services/store/category-store.service";
import { MonthSelectionStoreService } from "src/app/services/store/month-selection-store.service";
import { CategoryState } from "src/app/store/actions/categories.actions";
import { MonthSelectionState } from "src/app/store/actions/month-selection.actions";
import { BaseComponent } from "../../base-component.ts/base-component";


@Component({
  selector: 'category-menu',
  templateUrl: './category-menu.html',
  styleUrls: ['./category-menu.css']
})
export class CategoryMenu extends BaseComponent implements OnInit {
  public multipleChecked: boolean = false;
  public categories: Category[] = [];
  public available: number = 0;
  public menuTitle: string;
  public numSelected: number = 0;
  public categoryList: string = '';
  constructor(
    private categoryStoreService: CategoriesStoreService,
    private monthStoreService: MonthSelectionStoreService,
  ) {
    super();
  }

  ngOnInit() {
    this.logger.trace(CategoryMenu.name, 'onInit', "Was called");

    this.categoryStoreService.categories$.subscribe((categoriesState: CategoryState) => {
      this.updateMenu();
    });
    this.categoryStoreService.checkedCategories$.subscribe((checkedCategories: number) => {
      this.categories = this.categoryStoreService.getCheckedCategories();
      this.multipleChecked = checkedCategories > 1;
      this.numSelected = checkedCategories;
      this.updateMenu();
    });
    this.monthStoreService.monthSelection$.subscribe((selectedMonths: MonthSelectionState) => {
      this.updateMenu();
    });
  }

  onNoteChange(event: any) {
    this.logger.debug(CategoryMenu.name, 'onNoteChange', "Was called");
    // this.categoryStoreService.updateCategories(event.target.value);
    // TODO update category with new note
  }

  updateMenu() {
    this.logger.trace(CategoryMenu.name, 'updateMenu', "Was called");
    this.updateAvailable();
    this.updateMenuTitle();
  }

  updateAvailable() {
    this.logger.trace(CategoryMenu.name, 'updateAvailable', "Was called");
    this.available = this.categories.reduce((acc, category) => {
      const assigned = this.categoryStoreService.getAssigned(category.id);
      const activity = this.categoryStoreService.getMonthsRecords(category.id).reduce((total, currentRecord) => {
        return total + currentRecord.amount;
      }, 0);
      return acc + ( assigned - activity);
    }, 0);
  }

  updateMenuTitle(numSelected?: number): void {
    this.logger.trace(CategoryMenu.name, 'updateMenuTitle', "Was called");
    this.categoryList = '';
    if(this.multipleChecked) {
      this.menuTitle = `${this.numSelected} CATEGORIES SELECTED`;
      this.categories.forEach(category => {
        this.categoryList += this.categoryList.length > 0 ? `, ${category.name}` : category.name;
      });
    } else {
      this.menuTitle = this.categories.length > 0 ? this.categories[0].name.toUpperCase() : 'NO CATEGORIES SELECTED';
    }
  }
}
