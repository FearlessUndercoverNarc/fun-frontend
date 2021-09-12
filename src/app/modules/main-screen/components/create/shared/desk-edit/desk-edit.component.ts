import {Component, EventEmitter, Input, OnInit, Output, SkipSelf} from '@angular/core';
import {CreationResponse} from "../interfaces/creation-response.interface";
import {PathService} from "../../../../services/path.service";
import {NewDesk} from "../../../../interfaces/new-created/new-desk.interface";
import {EditedResponse} from "../../../../../../shared/interfaces/edited-response";
import {EditedFolder} from "../../../../../../shared/interfaces/editedFolder";
import {FoldersService} from "../../../../services/folders.service";
import {EditedDesk} from "../../../../../../shared/interfaces/edited-desk";

@Component({
  selector: 'app-desk-edit',
  templateUrl: './desk-edit.component.html',
  styleUrls: ['../components/creator-dialog.style.sass']
})
export class DeskEditComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<EditedResponse>();

  title = '';
  description = '';

  constructor(
    @SkipSelf() private _pathService: PathService,
    @SkipSelf() private _foldersService: FoldersService
  ) {
  }

  ngOnInit(): void {
  }


  closeModal(decision: boolean): void {
    let response: EditedResponse = {
      agreed: false,
      data: null
    }
    if (decision) {
      const data: EditedDesk = {
        id: this._foldersService.lastSelectedFolderId,
        title: this.title,
        description: this.description
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

