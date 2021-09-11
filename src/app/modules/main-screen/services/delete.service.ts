import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  selectedElementsToTrashbinMoved: ReplaySubject<void> = new ReplaySubject<void>();
  selectedElementsRecovered: ReplaySubject<void> = new ReplaySubject<void>();
  selectedElementsDeleted: ReplaySubject<void> = new ReplaySubject<void>();

  constructor(
    // @SkipSelf() private _foldersService: FoldersService,
  ) {
  }

  moveToTrashbinSelectedElements(): void {
    this.selectedElementsToTrashbinMoved.next();
  }

  recoverSelectedElements() {
    this.selectedElementsRecovered.next();
  }

  deleteSelectedElements() {
    this.selectedElementsDeleted.next();
  }
}
