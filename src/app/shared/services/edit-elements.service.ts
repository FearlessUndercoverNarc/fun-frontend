import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditElementsService {

  editedFolder: ReplaySubject<void> = new ReplaySubject<void>();
  editedDesk: ReplaySubject<void> = new ReplaySubject<void>();
  hidden: ReplaySubject<void> = new ReplaySubject<void>()

  constructor() {
  }

  editDesk(): void {
    this.editedDesk.next();
  }

  editFolder() {
    this.editedFolder.next();
  }

  hide() {
    this.hidden.next();
  }
}
