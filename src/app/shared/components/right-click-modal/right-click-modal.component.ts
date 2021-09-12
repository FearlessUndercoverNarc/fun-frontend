import { Component, ElementRef, Input, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { RightClickService } from "../../services/right-click.service";
import { DeleteService } from "../../../modules/main-screen/services/delete.service";
import { skip } from "rxjs/operators";
import { ShareModalService } from "../../services/share-modal.service";
import { ImportService } from 'src/app/modules/main-screen/services/import.service';
import { FoldersService } from 'src/app/modules/main-screen/services/folders.service';
import { DeskService } from '../../services/desk.service';

@Component({
  selector: 'app-right-click-modal',
  templateUrl: './right-click-modal.component.html',
  styleUrls: ['./right-click-modal.component.sass']
})
export class RightClickModalComponent implements OnInit {

  x: number = 0;
  y: number = 0;

  isElementModalShown: boolean = false;
  isMilkModalShown: boolean = false;
  isRecoverModalShown: boolean = false;

  @ViewChild('importFolderInput') importFolderInput?: ElementRef
  @ViewChild('importDeskInput') importDeskInput?: ElementRef

  constructor(
    @SkipSelf() private _rightClickService: RightClickService,
    @SkipSelf() private _deleteService: DeleteService,
    @SkipSelf() private _shareModalService: ShareModalService,
    private _importService: ImportService,
    private _foldersService: FoldersService,
    private _deskService: DeskService
  ) {
  }

  ngOnInit(): void {
    this._rightClickService.rightClickedElement
      .subscribe(() => {
        this.x = this.calcX();
        this.y = this.calcY();

        this.isElementModalShown = true;
        this.isMilkModalShown = false;
      })

    this._rightClickService.rightClickedMilk
      .subscribe(() => {
        this.x = this.calcX();
        this.y = this.calcY();

        this.isMilkModalShown = true;
        this.isElementModalShown = false;
      })

    this._rightClickService.rightClickedTrash
      .subscribe(() => {
        this.x = this.calcX();
        this.y = this.calcY();

        this.isRecoverModalShown = true;
      })

    this._rightClickService.hideAllModalsEvent.subscribe(() => {
      this.isMilkModalShown = false;
      this.isElementModalShown = false;
      this.isRecoverModalShown = false;
    })
  }

  private calcX() {
    return this._rightClickService.x;
  }

  private calcY() {
    return this._rightClickService.y;
  }

  moveToTrashbinElement() {
    this._rightClickService.hideAllModals();
    this._deleteService.moveToTrashbinSelectedElements();
  }

  recoverElement() {
    this._rightClickService.hideAllModals();
    this._deleteService.recoverSelectedElements();
  }

  deleteElement() {
    this._rightClickService.hideAllModals();
    this._deleteService.deleteSelectedElements();
  }

  shareElement() {
    this._rightClickService.hideAllModals();
    this._shareModalService.shareModalShown.next();
  }

  exportElement() {
    this._rightClickService.hideAllModals();
    this._importService.exportSelectedElements()
  }

  importFolder() {
    this.importFolderInput?.nativeElement.click()
  }

  uploadFolderImportFile() {
    this._importService.folderImportFile = this.importFolderInput?.nativeElement.files[0]

    this._foldersService.import()
      .subscribe(response => {
        location.reload()
      })

  }

  importBoard() {
    this.importDeskInput?.nativeElement.click()
  }

  uploadDeskImportFile() {
    this._importService.folderImportFile = this.importFolderInput?.nativeElement.files[0]

    this._foldersService.import()
      .subscribe(response => {
        location.reload()
      })
  }
}
