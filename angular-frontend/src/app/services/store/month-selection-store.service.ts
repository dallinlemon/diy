import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BaseService } from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class MonthSelectionStoreService extends BaseService {
  private _selectedDate: Date;
  monthSelection$: Subject<Date>

  constructor() {
    super();
  }

  public setMonthSelection(selectedDate: Date) {
    this.logger.trace(MonthSelectionStoreService.name, 'setMonthSelection', 'was called');
    this._selectedDate = selectedDate;
    this.logger.info(MonthSelectionStoreService.name, 'setMonthSelection', 'Month selection store was set');
    this.update();
  }

  get selectedDate(): Date {
    return this._selectedDate;
  }
  get selectedDateString(): string {
    return `${this._selectedDate.getUTCMonth() + 1}/${this._selectedDate.getUTCFullYear()}`;
  }

  /**
    * Updates Subscribers of monthSelection$
  */
  public update() {
    this.monthSelection$.next(this._selectedDate);
  }
}
