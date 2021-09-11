import {Component, EventEmitter, Input, OnInit, Output, SkipSelf} from '@angular/core';
import {CreationResponse} from "../../interfaces/creation-response.interface";
import {PathService} from "../../../../../services/path.service";
import {NewFolder} from "../../../../../interfaces/new-created/new-folder.interface";
import {NewDesk} from "../../../../../interfaces/new-created/new-desk.interface";

@Component({
  selector: 'desk-creator-dialog',
  templateUrl: './desk-creator-dialog.component.html',
  styleUrls: ['../creator-dialog.style.sass']
})
export class DeskCreatorDialogComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<CreationResponse>();

  title = '';
  description = '';

  constructor(
    @SkipSelf() private _pathService: PathService
  ) {
  }

  ngOnInit(): void {
  }


  closeModal(decision: boolean): void {
    let response: CreationResponse = {
      agreed: false,
      data: null
    }
    if (decision) {
      const data: NewDesk = {
        title: this.title,
        description: this.description,
        parentId: this._pathService.parentFolderId
      }

      response = {
        agreed: true,
        data: data
      }
    }

    this.title = '';
    this.description = '';

    this.modalClosed.emit(response);
  }
}
