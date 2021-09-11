import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RightClickService {
  constructor() {
  }

  x: number = 0;
  y: number = 0;

  rightClickedElement: ReplaySubject<void> = new ReplaySubject<void>();
  rightClickedMilk: ReplaySubject<void> = new ReplaySubject<void>();

  hideAllModalsEvent: ReplaySubject<void> = new ReplaySubject<void>();

  hideAllModals(): void {
    this.hideAllModalsEvent.next();
  }
}
