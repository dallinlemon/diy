import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-view',
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css']
})
export class BudgetViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.store.dispatch(setCategories({ categories: categories }));
    // this.store.dispatch(setGroups({ groups: groups }));
    // this.store.dispatch(setRecords({ records: mockRecords }));
  }

}
