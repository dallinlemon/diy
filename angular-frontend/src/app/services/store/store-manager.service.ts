import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreManagerService {

    /**
     * Private sub holds BehaviorSubject of boolean.
     */
    public showUniversalNavBar = new BehaviorSubject<boolean>(true);

    /**
     * Shows or hides the Navbar
     */
    public showNavbar(show: boolean) {
        if (this.showUniversalNavBar.value !== show) {
            setTimeout(() => {
                this.showUniversalNavBar.next(show);
            });
        }
    }

}
