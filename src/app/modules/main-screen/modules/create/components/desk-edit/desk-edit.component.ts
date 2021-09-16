import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PathService} from "../../../../services/path.service";
import {EditedResponse} from "../../../../../../shared/interfaces/edited-response.interface";
import {FoldersService} from "../../../../services/folders.service";

@Component({
  selector: 'app-desk-edit',
  templateUrl: './desk-edit.component.html',
  styleUrls: ['../../styles/creator-dialog.style.sass']
})
export class DeskEditComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<EditedResponse>();

  title = '';
  description = '';

  constructor(
    private _pathService: PathService,
    private _foldersService: FoldersService
  ) {
  }

  ngOnInit(): void {
  }

  closeModal(decision: boolean): void {
    let response: EditedResponse = {
      agreed: decision,
      data: {
        id: this._foldersService.lastSelectedFolderId,
        title: this.title,
        description: this.description
      }
    }

    this.title = '';
    this.description = '';

    this.modalClosed.emit(response);
  }
}

