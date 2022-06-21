import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Category from 'shared/models/category.model';
import { BudgetMenuStoreService } from 'src/app/services/store/budget-menu.service';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { RecordStoreService } from 'src/app/services/store/record-store.service';
import { BudgetMenu, BudgetMenuState } from 'src/app/store/actions/budget-menu.actions';
import { CategoryState } from 'src/app/store/actions/categories.actions';
import { RootStoreInjection } from 'src/app/types/store.types';

@Component({
  selector: 'category-available-menu',
  templateUrl: './category-available-menu.html',
  styleUrls: ['./category-available-menu.css']
})
export class CategoryAvailableMenu implements OnInit {
  menu: BudgetMenu;
  categories: Category[];
  selectedCategory: any;
  test = [
    'test1',
    'test2',
    'test3',
  ]
  constructor(
    private store: Store<RootStoreInjection>,
    private budgetMenuStoreService: BudgetMenuStoreService,
    private categoriesStoreService: CategoriesStoreService,
  ) {
    this.budgetMenuStoreService.menu$.subscribe((menuState: BudgetMenuState) => {
      this.menu = {...menuState?.menu};
    });
    this.categoriesStoreService.categories$.subscribe((categoriesState: CategoryState) => {
      this.categories = [...categoriesState?.categories];
    });
  }

  ngOnInit(): void {
  }

}
