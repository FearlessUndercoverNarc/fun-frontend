import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareModalService {
  constructor() {
  }

  shareModalShown: ReplaySubject<void> = new ReplaySubject<void>();

  modalHidden: ReplaySubject<void> = new ReplaySubject<void>();

  hideModal(): void {
    this.modalHidden.next();
  }
}
