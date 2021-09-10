import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

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
