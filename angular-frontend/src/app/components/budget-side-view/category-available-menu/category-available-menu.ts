import { Component, OnInit } from '@angular/core';
import Category from '../../../models/category.model';
import { BudgetMenu, BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { GroupStoreService } from 'src/app/services/store/group-store.service';

@Component({
  selector: 'category-available-menu',
  templateUrl: './category-available-menu.html',
  styleUrls: ['./category-available-menu.css']
})
export class CategoryAvailableMenu implements OnInit {
  menu: BudgetMenu;
  categories: Category[];
  groups: any[] = [];
  selectedCategory: any;
  test = [
    'test1',
    'test2',
    'test3',
  ]
  constructor(
    private budgetMenuStoreService: BudgetMenuStoreService,
    private categoriesStoreService: CategoriesStoreService,
    private groupStoreService: GroupStoreService,
  ) {

  }

  ngOnInit(): void {
    this.budgetMenuStoreService.menu$.subscribe((menu: BudgetMenu) => {
      this.menu = {...menu};
    });
    this.categoriesStoreService.categories$.subscribe((categories: Category[]) => {
      this.categories = [...categories];
      //this.groups = [...categoriesState?.categories];
    });
    // this.cat.groups$.subscribe((groupsState: GroupState) => {
    //   this.groups = [...groupsState?.groups];
    // });
  }

}
