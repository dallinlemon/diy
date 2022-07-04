import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { BudgetMenu, BudgetMenuState, resetBudgetMenu, setBudgetMenu } from "src/app/store/actions/budget-menu.actions";
import { BudgetMenuTypes } from "src/app/types/budget-menu-types.enum";
import { RootStoreInjection } from "src/app/types/store.types";
import { BaseService } from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class BudgetMenuStoreService extends BaseService {
  menu: BudgetMenu;
  menu$: Observable<BudgetMenuState>

  constructor(private store: Store<RootStoreInjection>) {
    super();
    this.menu$ = store.select('budgetMenuReducer');
    this.menu$.subscribe((menuState: BudgetMenuState) => {
      this.logger.trace(BudgetMenuStoreService.name, 'subscription', 'was called');
      this.menu = {...menuState?.menu};
    });
  }

  setBudgetMenuType(type: BudgetMenuTypes) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', `was called with type ${type}`);
    this.setMenu({...this.menu, type: type});
  }
  setBudgetMenuDisplay(display: boolean) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', `was called with display ${display}`);
    this.setMenu({...this.menu, display: display});
  }
  setBudgetMenuId(focusedId: number) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', `was called with id ${focusedId}`);
    this.setMenu({...this.menu, id: focusedId});
  }

  public resetMenu() {
    this.logger.trace(BudgetMenuStoreService.name, 'resetBudgetMenu', 'was called');
    this.store.dispatch(resetBudgetMenu());
    this.logger.info(BudgetMenuStoreService.name, 'resetBudgetMenu', 'budget store was reset');
  }
  public setMenu(menu: BudgetMenu) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', 'was called');
    this.store.dispatch(setBudgetMenu({ menu: menu }));
    this.logger.info(BudgetMenuStoreService.name, 'setBudgetMenu', 'budget store was set');
  }
}
