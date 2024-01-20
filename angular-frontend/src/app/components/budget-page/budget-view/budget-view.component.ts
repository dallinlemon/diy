import { Component, OnInit } from '@angular/core';
import categories from 'src/app/mock-data/arrays/categories';
import groups from 'src/app/mock-data/arrays/groups';
import mockRecords from 'src/app/mock-data/arrays/records';
import { CategoriesStoreService } from 'src/app/services/store/category-store.service';
import { GroupStoreService } from 'src/app/services/store/group-store.service';
import { RecordStoreService } from 'src/app/services/store/record-store.service';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css']
})
export class BudgetViewComponent implements OnInit {

  constructor(
    public categoriesService: CategoriesStoreService,
    public groupsService: GroupStoreService,
    public recordsService: RecordStoreService
  ) { }

  ngOnInit(): void {
    this.categoriesService.setCategories(categories);
    this.groupsService.setGroups(groups);
    this.recordsService.setRecords(mockRecords);
  }

}
