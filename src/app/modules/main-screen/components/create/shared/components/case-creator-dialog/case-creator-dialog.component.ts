import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreationResponse} from "../../interfaces/creation-response.interface";
import {NewCase} from "../../../../../interfaces/new-created/new-case.interface";

@Component({
  selector: 'app-creator-dialog',
  templateUrl: './case-creator-dialog.component.html',
  styleUrls: ['../creator-dialog.style.sass']
})
export class CaseCreatorDialogComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<CreationResponse>();

  title = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  closeModal(decision: boolean): void {
    let response: CreationResponse = {
      agreed: decision,
      data: null
    }
    if (decision) {
      const data: NewCase = {
        title: this.title,
        parentId: null
      }

      response = {
        agreed: true,
        data: data
      }
    }

    this.title = '';

    this.modalClosed.emit(response);
  }

}
