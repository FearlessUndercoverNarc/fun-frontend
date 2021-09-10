import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-desk-creator-dialog',
  templateUrl: './desk-creator-dialog.component.html',
  styleUrls: ['../creator-dialog.style.sass']
})
export class DeskCreatorDialogComponent implements OnInit {

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
