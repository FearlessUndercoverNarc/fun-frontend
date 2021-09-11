import {Component, Input, OnInit, SkipSelf} from '@angular/core';
import {RightClickService} from "../../services/right-click.service";
import {DeleteService} from "../../../modules/main-screen/services/delete.service";
import {skip} from "rxjs/operators";

@Component({
  selector: 'app-right-click-modal',
  templateUrl: './right-click-modal.component.html',
  styleUrls: ['./right-click-modal.component.sass']
})
export class RightClickModalComponent implements OnInit {

  x: number = 0;
  y: number = 0;

  isElementModalShown: boolean = false;
  isMilkModalShown: boolean = false;
  isRecoverModalShown: boolean = false;

  constructor(
    @SkipSelf() private _rightClickService: RightClickService,
    @SkipSelf() private _deleteService: DeleteService
  ) {
  }

  ngOnInit(): void {
    this._rightClickService.rightClickedElement
      .subscribe(() => {
        this.x = this.calcX();
        this.y = this.calcY();

        this.isElementModalShown = true;
        this.isMilkModalShown = false;
      })

    this._rightClickService.rightClickedMilk
      .subscribe(() => {
        this.x = this.calcX();
        this.y = this.calcY();

        this.isMilkModalShown = true;
        this.isElementModalShown = false;
      })

    this._rightClickService.rightClickedTrash
      .subscribe(() => {
        this.x = this.calcX();
        this.y = this.calcY();

        this.isRecoverModalShown = true;
      })

    this._rightClickService.hideAllModalsEvent.subscribe(() => {
      this.isMilkModalShown = false;
      this.isElementModalShown = false;
      this.isRecoverModalShown = false;
    })
  }

  private calcX() {
    return this._rightClickService.x;
  }

  private calcY() {
    return this._rightClickService.y;
  }

  moveToTrashbinElement() {
    this._rightClickService.hideAllModals();
    this._deleteService.moveToTrashbinSelectedElements();
  }

  recoverElement() {
    this._rightClickService.hideAllModals();
    this._deleteService.recoverSelectedElements();
  }

  deleteElement() {
    this._rightClickService.hideAllModals();
    this._deleteService.deleteSelectedElements();
  }
}
