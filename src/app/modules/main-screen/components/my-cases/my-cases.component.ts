import {Component, OnInit, SkipSelf} from '@angular/core';
import {CasesService} from "../../services/cases.service";
import {FolderDto} from "../../interfaces/dto/folder-dto.interface";
import {PathService} from "../../services/path.service";
import {DesksLoaderService} from "../../services/desks-loader.service";
import {FolderOnPage} from "../../interfaces/on-page/folder-on-page";
import {DeskOnPage} from "../../interfaces/on-page/desk-on-page";
import {PathPart} from "../../../../shared/interfaces/path-part.interface";
import {FoldersService} from "../../services/folders.service";
import {RightClickService} from "../../../../shared/services/right-click.service";
import {DeleteService} from "../../services/delete.service";
import {FolderTrashBinService} from "../../services/folder-trash-bin.service";
import {DeskTrashBinService} from "../../services/desk-trash-bin.service";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {ShareModalService} from "../../../../shared/services/share-modal.service";
import {AccountService} from "../../../../shared/services/account.service";
import {Router} from "@angular/router";

import {ImportService} from '../../services/import.service';
import {DeskService} from 'src/app/shared/services/desk.service';
import {EditElementsService} from "../../../../shared/services/edit-elements.service";
import {EditedResponse} from "../../../../shared/interfaces/edited-response";
import {BasicCRUD} from "../../../../shared/services/basic-crud.service";
import {zip} from "rxjs";


@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.sass']
})
export class MyCasesComponent implements OnInit {

  foldersOnPage: FolderOnPage[] = [];
  desksOnPage: DeskOnPage[] = [];

  onceClicked: boolean = false;
  isDragging: boolean = false;
  private _creatingTarget: string = '';

  constructor(
    @SkipSelf() private _casesService: CasesService,
    @SkipSelf() private _desksService: DesksLoaderService,
    @SkipSelf() private _pathService: PathService,
    @SkipSelf() private _foldersService: FoldersService,
    @SkipSelf() private _trashedFoldersService: FolderTrashBinService,
    @SkipSelf() private _trashedDesksService: DeskTrashBinService,
    @SkipSelf() private _rightClickService: RightClickService,
    @SkipSelf() private _shareModalService: ShareModalService,
    private _editElementsService: EditElementsService,
    private _accountService: AccountService,
    private _deleteService: DeleteService,
    private _router: Router,
    private _importService: ImportService,
    private _deskService: DeskService
  ) {
  }

  isFolderEditShown: boolean = false;
  isDeskEditShown: boolean = false;

  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadAllElements();

    this._pathService.pathChanged.subscribe(() => {
      this.loadAllElements()
    });

    this._deleteService.selectedElementsToTrashbinMoved
      .subscribe(() => this.performMoveToTrashBinFromSelected())

    this._importService.selectedElementsExported
      .subscribe(() => this.exportSelectedElement())

    this._editElementsService.editedDesk.subscribe(() => {
      this.isDeskEditShown = true;
      this._creatingTarget = 'desk'
    })
    this._editElementsService.editedFolder.subscribe(() => {
      this.isFolderEditShown = true;
      this._creatingTarget = 'folder'
    })
    this._editElementsService.hidden.subscribe(() => {
      this.isFolderEditShown = false;
      this.isDeskEditShown = false;
    })
  }

  private performMoveToTrashBinFromSelected() {
    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (!this.foldersOnPage[i].isSelected) {
        continue;
      }
      this._trashedFoldersService.moveToTrashBin(this.foldersOnPage[i].folder.id)
        .subscribe(() => {
          this.foldersOnPage.splice(i, 1)
        });
    }

    this._foldersService.folders = this.foldersOnPage.map(f => {
      return f.folder
    })

    for (let i = 0; i < this.desksOnPage.length; i++) {
      if (this.desksOnPage[i].isSelected) {
        this._trashedDesksService.moveToTrashBin(this.desksOnPage[i].desk.id)
          .subscribe(() => {
            this.desksOnPage.splice(i, 1);
          })
      }
    }

    this._desksService.desks = this.desksOnPage.map(d => {
      return d.desk
    })

    this.unselectAll();
  }

  exportSelectedElement() {
    this.foldersOnPage
      .filter(f => f.isSelected)
      .forEach(f => {
        this._foldersService.export(f.folder.id)
          .subscribe(arrayBuffer => {
            this.downloadFile(arrayBuffer, f.folder.title + '.fun', 'application/binary')
          })
      })

    this.desksOnPage
      .filter(d => d.isSelected)
      .forEach(d => {
        this._deskService.export(d.desk.id)
          .subscribe(arrayBuffer => {
            this.downloadFile(arrayBuffer, d.desk.title + '.fun', 'application/binary')
          })
      })
  }

  downloadFile(content: ArrayBuffer, fileName: string, contentType: string) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  selectFolder(folderOnPage: FolderOnPage): void {
    if (!folderOnPage.isSelected) {
      this.unselectAll();

      folderOnPage.isSelected = true;

      this.onceClicked = true;
    } else {
      if (this.onceClicked) {
        this.onceClicked = false;
        this._rightClickService.hideAllModals();
        this.gotoSubFolder(folderOnPage.folder);
      }
    }
  }

  unselectAll() {
    this.foldersOnPage.forEach(f => f.isSelected = false);
    this.desksOnPage.forEach(d => d.isSelected = false);
  }

  onMilkClicked(event: MouseEvent): void {
    this.onceClicked = false;

    if (event.target !== event.currentTarget) {
      event.preventDefault();
    } else {
      this.unselectAll();
    }

    this._rightClickService.hideAllModals();
  }


  selectDesk(deskOnPage: DeskOnPage): void {
    if (!deskOnPage.isSelected) {
      this.unselectAll();

      deskOnPage.isSelected = true;

      this.onceClicked = true;
    } else {
      if (this.onceClicked) {
        this.onceClicked = false;
        this._rightClickService.hideAllModals();

        this._router.navigate(['board', deskOnPage.desk.id.toString()])
      }
    }
  }

  private gotoSubFolder(subFolder: FolderDto) {
    const newPathPart: PathPart = {
      folderId: subFolder.id,
      folderTitle: subFolder.title
    }
    this._pathService.deeper(newPathPart);

    this.loadSubFolder(subFolder.id);
  }

  getHeaderTitle(): string {
    return this._pathService.isRoot() ? 'Дела' : 'Папки';
  }

  private loadAllElements() {
    if (this._pathService.isRoot()) {
      this.loadRoot();
      this._desksService.desks = [];
      this.desksOnPage = [];
    } else {
      this.loadSubFolder(this._pathService.parentFolderId);
    }
  }

  private loadRoot() {
    this.isLoading = true;
    this._casesService.getMyRoot()
      .subscribe(() => {
        this.foldersOnPage = this._casesService.myRoot.map(folder => {
          return {folder: folder, isSelected: false};
        });
        this.isLoading = false;
      }, error => {
        console.log(error)
      })
  }

  private loadSubFolder(subFolderId: number): void {
    this.foldersOnPage = []
    this.desksOnPage = []

    this.isLoading = true;

    zip(this._foldersService.loadSubFolders(subFolderId), this._desksService.loadDesksInFolder(subFolderId))
      .subscribe(() => {
        this.foldersOnPage = this._foldersService.folders.map(f => {
          return {folder: f, isSelected: false};
        })
        this.desksOnPage = this._desksService.desks.map(d => {
          return {desk: d, isSelected: false}
        })
        this.isLoading = false;
      }, error => {
        alert('ERROR. Check console for details.');
        console.log(error);
      });
  }

  onFolderRightClicked(event: MouseEvent, folderOnPage: FolderOnPage) {
    this.onceClicked = false;

    event.stopImmediatePropagation();

    event.preventDefault();

    console.log('id: ' + folderOnPage.folder.id.toString())
    console.log('isFolder: ' + true)
    this._foldersService.lastSelectedFolderId = folderOnPage.folder.id;
    this._foldersService.isFolderSelected = true;

    this._rightClickService.x = event.x;
    this._rightClickService.y = event.y;

    this._rightClickService.rightClickedElement.next();

    this.selectFolder(folderOnPage)
  }

  onDeskRightClicked(event: MouseEvent, deskOnPage: DeskOnPage) {
    this.onceClicked = false;

    event.stopImmediatePropagation();

    event.preventDefault();

    console.log('id: ' + deskOnPage.desk.id.toString())
    console.log('isFolder: ' + false)

    this._rightClickService.x = event.x;
    this._rightClickService.y = event.y;

    this._deskService.lastSelectedDeskId = deskOnPage.desk.id;
    this._deskService.isDeskSelected = true;
    this._rightClickService.rightClickedElement.next();
    // TODO: Implement logic for desk, similar to 'onDeskRightClicked'
    this.selectDesk(deskOnPage);
  }

  onMilkRightClicked(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      event.preventDefault();

      this._rightClickService.x = event.x;
      this._rightClickService.y = event.y;

      this._rightClickService.rightClickedMilk.next();
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      let destinationFolderId = event.container.data.folder.id as number;

      if (typeof event.previousContainer.data?.desk === 'object') {
        let deskId = event.previousContainer.data.desk.id as number;
        this._desksService.moveToFolder(deskId, destinationFolderId)
          .subscribe(() => {
            this.desksOnPage = this.desksOnPage.filter(deskOnPage => {
              return deskOnPage.desk.id != deskId
            })
            this._desksService.desks = this.desksOnPage.map(deskOnPage => {
              return deskOnPage.desk
            })
          })
      } else {
        let folderId = event.previousContainer.data.folder.id as number;
        this._foldersService.moveToFolder(folderId, destinationFolderId)
          .subscribe(() => {
            this.foldersOnPage = this.foldersOnPage.filter(folderOnPage => {
              return folderOnPage.folder.id != folderId
            })
            this._foldersService.folders = this.foldersOnPage.map(folderOnPage => {
              return folderOnPage.folder
            })
          })
      }
    }
  }

  isFolderPredicate(el: CdkDrag, drop: CdkDropList): boolean {
    return drop.id === 'folder';
  }

  modalClosed(result: EditedResponse): void {
    this._editElementsService.hide();

    console.log(result)

    let service: BasicCRUD<any> = this._creatingTarget == 'desk' ? this._desksService : this._foldersService;

    if (result.agreed) {
      service.update(result.data)
        .subscribe((response) => {
            if (this._creatingTarget == 'desk') {
              let desk = this.desksOnPage.find(d => d.desk.id == result.data?.id);
              if (desk) desk.desk.title = result.data?.title ?? 'Unknown';
            } else {
              let folder = this.foldersOnPage.find(f => f.folder.id == result.data?.id);
              if (folder) folder.folder.title = result.data?.title ?? 'Unknown';
            }
          }
        )
    }
  }

  onFolderOnPageClicked(folderOnPage: FolderOnPage) {
    this.onceClicked = true;
    this.selectFolder(folderOnPage)
  }

  onDeskOnPageClicked(deskOnPage: DeskOnPage) {
    this.onceClicked = true;
    this.selectDesk(deskOnPage)
  }
}
