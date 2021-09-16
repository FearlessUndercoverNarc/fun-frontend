import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PathService} from "../../../../services/path.service";
import {EditedResponse} from "../../../../../../shared/interfaces/edited-response.interface";
import {FoldersService} from "../../../../services/folders.service";

@Component({
  selector: 'app-folder-edit',
  templateUrl: './folder-edit.component.html',
  styleUrls: ['../../styles/creator-dialog.style.sass']
})
export class FolderEditComponent implements OnInit {

  @Input() isShown: boolean = false;
  @Output() modalClosed = new EventEmitter<EditedResponse>();

  title = '';

  constructor(
    private _pathService: PathService,
    private _foldersService: FoldersService
  ) {
  }

  ngOnInit(): void {
    // let folder = this._foldersService.folders.find(f => f.id == this._foldersService.lastSelectedFolderId);
    // if (folder) this.title = folder.title;
  }


  closeModal(decision: boolean): void {
    let response: EditedResponse = {
      agreed: decision,
      data: {
        id: this._foldersService.lastSelectedFolderId,
        title: this.title
      }
    }

    this.title = '';

    this.modalClosed.emit(response);
  }
}
