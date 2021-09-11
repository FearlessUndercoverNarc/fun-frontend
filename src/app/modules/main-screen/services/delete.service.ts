import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  selectedElementsDeleted: ReplaySubject<void> = new ReplaySubject<void>();

  constructor(
    // @SkipSelf() private _foldersService: FoldersService,
  ) {
  }

  deleteSelectedElements(): void {
    this.selectedElementsDeleted.next();
  }

}
