import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-folder-creator-dialog',
  templateUrl: './folder-creator-dialog.component.html',
  styleUrls: ['../creator-dialog.style.sass']
})
export class FolderCreatorDialogComponent implements OnInit {

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
