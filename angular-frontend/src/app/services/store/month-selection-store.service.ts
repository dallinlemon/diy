import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MonthSelectionState, setMonthSelection } from "src/app/store/actions/month-selection.actions";
import { RootStoreInjection } from "src/app/types/store.types";
import { BaseService } from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class MonthSelectionStoreService extends BaseService {
  private _selectedDate: Date;
  monthSelection$: Observable<MonthSelectionState>

  constructor(private store: Store<RootStoreInjection>) {
    super();
    this.monthSelection$ = store.select('monthSelectionReducer');
    this.monthSelection$.subscribe((monthSelectionState: MonthSelectionState) => {
      this.logger.trace(MonthSelectionStoreService.name, 'subscription', 'was called');
      this._selectedDate = monthSelectionState.selectedDate;
    });
  }

  public setMonthSelection(selectedDate: Date) {
    this.logger.trace(MonthSelectionStoreService.name, 'setMonthSelection', 'was called');
    this.store.dispatch(setMonthSelection({ selectedDate }));
    this.logger.info(MonthSelectionStoreService.name, 'setMonthSelection', 'Month selection store was set');
  }

  get selectedDate(): Date {
    return this._selectedDate;
  }
  get selectedDateString(): string {
    return `${this._selectedDate.getUTCMonth() + 1}/${this._selectedDate.getUTCFullYear()}`;
  }
}
