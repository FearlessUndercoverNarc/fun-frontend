import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreationResponse} from "../../interfaces/creation-response.interface";
import {NewFolder} from "../../../../interfaces/new-created/new-folder.interface";
import {PathService} from "../../../../services/path.service";

@Component({
  selector: 'folder-creator-dialog',
  templateUrl: './folder-creator-dialog.component.html',
  styleUrls: ['../../styles/creator-dialog.style.sass']
})
export class FolderCreatorDialogComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<CreationResponse>();

  title = '';

  constructor(
    private _pathService: PathService
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
      const data: NewFolder = {
        title: this.title,
        parentId: this._pathService.parentFolderId
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
