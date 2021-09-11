import {Component, Input, OnInit, SkipSelf} from '@angular/core';
import {RightClickService} from "../../services/right-click.service";

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

  constructor(
    @SkipSelf() private _rightClickService: RightClickService
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

    this._rightClickService.hideAllModalsEvent.subscribe(() => {
      this.isMilkModalShown = false;
      this.isElementModalShown = false;
    })
  }

  private calcX() {
    return this._rightClickService.x;
  }

  private calcY() {
    return this._rightClickService.y;
  }
}
