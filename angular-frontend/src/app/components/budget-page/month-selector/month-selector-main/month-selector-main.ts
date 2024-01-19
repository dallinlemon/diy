import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/components/base-component.ts/base-component";
import { MonthSelectionStoreService } from "src/app/services/store/month-selection-store.service";

@Component({
  selector: 'month-selector-main',
  templateUrl: './month-selector-main.html',
  styleUrls: ['./month-selector-main.css']
})
export class MonthSelectorMainComponent extends BaseComponent implements OnInit {
  public monthDisplay: string;
  public currentDate: Date;
  constructor(
    private monthSelectionStoreService: MonthSelectionStoreService,
  ) {
    super();
  }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.monthSelectionStoreService.monthSelection$.subscribe((month: Date) => {
      this.currentDate = month;
      this.setMonth();
    });
  }

  public movePrevious() {
    this.currentDate.setUTCMonth(this.currentDate.getUTCMonth() - 1);
    this.monthSelectionStoreService.setMonthSelection(this.currentDate);
    this.setMonth();
  }

  public moveNext() {
    this.currentDate.setUTCMonth(this.currentDate.getUTCMonth() + 1);
    this.monthSelectionStoreService.setMonthSelection(this.currentDate);
    this.setMonth();
  }

  public setMonth() {
    this.monthDisplay = this.monthSelectionStoreService.selectedDateString;
  }
}
