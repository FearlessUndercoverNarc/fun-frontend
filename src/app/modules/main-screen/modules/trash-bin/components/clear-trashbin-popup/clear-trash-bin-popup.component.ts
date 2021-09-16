import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './clear-trash-bin-popup.component.html',
  styleUrls: ['./clear-trash-bin-popup.component.sass']
})
export class ClearTrashBinPopupComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  closeModal(decision: boolean): void {
    this.modalClosed.emit(decision);
  }

}
