import {Component, EventEmitter, Input, OnInit, Output, SkipSelf} from '@angular/core';
import {CreationResponse} from "../interfaces/creation-response.interface";
import {PathService} from "../../../../services/path.service";
import {NewDesk} from "../../../../interfaces/new-created/new-desk.interface";
import {EditedResponse} from "../../../../../../shared/interfaces/edited-response";
import {EditedFolder} from "../../../../../../shared/interfaces/editedFolder";
import {FoldersService} from "../../../../services/folders.service";

@Component({
  selector: 'app-folder-edit',
  templateUrl: './folder-edit.component.html',
  styleUrls: ['../components/creator-dialog.style.sass']
})
export class FolderEditComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<EditedResponse>();

  title = '';

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
      const data: EditedFolder = {
        id: this._foldersService.lastSelectedFolderId,
        title: this.title
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
