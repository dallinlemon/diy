import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BudgetMenuTypes } from "src/app/types/budget-menu-types.enum";
import { BaseService } from "../base-service";

@Injectable({
  providedIn: 'root'
})
export class BudgetMenuStoreService extends BaseService {
  menu: BudgetMenu;
  menu$: Subject<BudgetMenu>

  constructor() {
    super();
  }

  setBudgetMenuType(type: BudgetMenuTypes) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', `was called with type ${type}`);
    this.setMenu({...this.menu, type: type});
  }
  setBudgetMenuDisplay(display: boolean) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', `was called with display ${display}`);
    this.setMenu({...this.menu, display: display});
  }

  public resetMenu() {
    this.logger.trace(BudgetMenuStoreService.name, 'resetBudgetMenu', 'was called');
    this.menu = {
      type: BudgetMenuTypes.BLANK,
      display: false
    } as BudgetMenu;
    this.logger.info(BudgetMenuStoreService.name, 'resetBudgetMenu', 'budget store was reset');
    this.update();
  }
  public setMenu(menu: BudgetMenu) {
    this.logger.trace(BudgetMenuStoreService.name, 'setBudgetMenu', 'was called');
    this.menu = menu;
    this.logger.info(BudgetMenuStoreService.name, 'setBudgetMenu', 'budget store was set');
    this.update();
  }

  public update() {
    this.menu$.next(this.menu);
  }
}

export type BudgetMenu = {
  type: BudgetMenuTypes;
  display: boolean;
}

