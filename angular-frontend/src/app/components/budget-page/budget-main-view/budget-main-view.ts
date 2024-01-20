import { Component, OnInit } from '@angular/core';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import Group from '../../../models/group.model';
import { BaseComponent } from '../../base-component.ts/base-component';
import { Subject } from 'rxjs';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import Category from 'src/app/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupPopup } from '../../add-group-popup/add-group-popup';
import { AddCategoryPopup } from '../../add-category-popup/add-category-popup';

@Component({
  selector: 'budget-main-view',
  templateUrl: './budget-main-view.html',
  styleUrls: ['./budget-main-view.css'],
})
export class BudgetMainView extends BaseComponent implements OnInit {
  public createGroupPressed: Subject<null> = new Subject();
  public createCategoryPressed: Subject<null> = new Subject();
  public groups: Group[];
  public groupPopup: boolean = false;
  public categoryPopup: boolean = false;
  constructor(
    private groupStoreService: GroupStoreService,
    private categoryStoreService: CategoriesStoreService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.groupStoreService.groups$.subscribe((groups: Group[]) => {
      this.reloadGroups();
    });
    this.categoryStoreService.categories$.subscribe((_categoryState: Category[]) => {
      this.reloadGroups();
    });
  }

  public reloadGroups() {
    this.groups = this.groupStoreService.groups.filter(group => group.budget_id === 1);
  }

  public addGroup() {
    this.dialog.open(AddGroupPopup, {
      maxHeight: '92vh',
      data: {},
      panelClass: '',
      autoFocus: true,
      disableClose:true,
      role: 'dialog'
    });
  }

  public addCategory() {
    this.dialog.open(AddCategoryPopup, {
      maxHeight: '92vh',
      data: {},
      panelClass: '',
      autoFocus: true,
      disableClose:true,
      role: 'dialog'
    });
  }

  public deleteGroup() {
    this.logger.trace(BudgetMainView.name, 'deleteGroup', 'was called');
    this.groupStoreService.deleteCheckedGroups();
  }

}
