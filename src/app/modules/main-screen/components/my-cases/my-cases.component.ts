import {Component, EventEmitter, Input, OnInit, SkipSelf} from '@angular/core';
import {CasesService} from "../../services/cases.service";
import {FolderDto} from "../../interfaces/dto/folder-dto.interface";
import {DeskDto} from "../../interfaces/dto/desk-dto.interface";
import {PathService} from "../../services/path.service";
import {DesksLoaderService} from "../../services/desks-loader.service";
import {FolderOnPage} from "../../interfaces/on-page/folder-on-page";
import {DeskOnPage} from "../../interfaces/on-page/desk-on-page";
import {map} from "rxjs/operators";
import {PathPart} from "../../../../shared/interfaces/path-part.interface";
import {FoldersService} from "../../services/folders.service";
import {RightClickService} from "../../../../shared/services/right-click.service";
import {DeleteService} from "../../services/delete.service";
import {TrashedFoldersService} from "../../services/trashed-folders.service";
import {TrashedDesksService} from "../../services/trashed-desks.service";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";
import {ShareModalService} from "../../../../shared/services/share-modal.service";
import {AccountService} from "../../../../shared/services/account.service";

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

  constructor(
    @SkipSelf() private _casesService: CasesService,
    @SkipSelf() private _desksService: DesksLoaderService,
    @SkipSelf() private _pathService: PathService,
    @SkipSelf() private _foldersService: FoldersService,
    @SkipSelf() private _trashedFoldersService: TrashedFoldersService,
    @SkipSelf() private _trashedDesksService: TrashedDesksService,
    @SkipSelf() private _rightClickService: RightClickService,
    @SkipSelf() private _shareModalService: ShareModalService,
    private _accountService: AccountService,
    private _deleteService: DeleteService
  ) {
  }

  ngOnInit(): void {

    this._pathService.goToRoot();

    this.loadAllElements();

    this._pathService.pathChanged.subscribe(() => {
      this.loadAllElements()
    });

    this._deleteService.selectedElementsToTrashbinMoved
      .subscribe(() => this.moveToTrashbinSelectedElements())
  }

  private moveToTrashbinSelectedElements() {
    console.log('here 3')

    console.table(this.foldersOnPage);

    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        this._trashedFoldersService.moveToTrash(this.foldersOnPage[i].folder.id)
          .subscribe(() => {
            this.foldersOnPage.splice(i, 1)
          });
      }
    }

    this._foldersService.folders = this.foldersOnPage.map(f => {
      return f.folder
    })

    for (let i = 0; i < this.desksOnPage.length; i++) {
      if (this.desksOnPage[i].isSelected) {
        this._trashedDesksService.moveToTrash(this.desksOnPage[i].desk.id)
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

  selectFolder(folderOnPage: FolderOnPage): void {
    if (!folderOnPage.isSelected) {
      this.unselectAll();

      folderOnPage.isSelected = true;

      this.onceClicked = true;
    } else {
      if (this.onceClicked) {
        this.onceClicked = false;
        this._rightClickService.hideAllModals();
        this.openSubFolder(folderOnPage.folder);
      }
    }
  }

  unselectAll() {
    for (let folder of this.foldersOnPage) {
      folder.isSelected = false;
    }

    for (let desk of this.desksOnPage) {
      desk.isSelected = false;
    }
  }

  selectMilk(event: MouseEvent): void {
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
        alert('Not implemented.')
      }
    }
  }

  private openSubFolder(subFolder: FolderDto) {
    const newPathPart: PathPart = {
      folderId: subFolder.id,
      folderTitle: subFolder.title
    }
    this._pathService.deeper(newPathPart);

    this.processSubFolder(subFolder.id);
  }

  private processSubFolder(subFolderId: number): void {
    this._foldersService.loadSubFolders(subFolderId)
      .subscribe(() => {
        this.foldersOnPage = this._foldersService.folders.map(f => {
          return {folder: f, isSelected: false};
        })

        this._desksService.loadDesks()
          .subscribe(() => {
            this.desksOnPage = this._desksService.desks.map(d => {
              return {desk: d, isSelected: false}
            })
          })
      }, error => {
        alert('ERROR. Check console for details.');
        console.log(error);
      });
  }

  getHeaderTitle(): string {
    return this._pathService.isRoot() ? 'Дела' : 'Папки';
  }

  private loadAllElements() {
    if (this._pathService.isRoot()) {
      this._casesService.loadCases()
        .subscribe(() => {
          this.foldersOnPage = this._casesService.cases.map(c => {
            return {folder: c, isSelected: false};
          });
        }, error => {
          console.log(error)
        })

      this._desksService.desks = [];
      this.desksOnPage = [];

    } else {
      this.processSubFolder(this._pathService.parentFolderId);
    }
  }

  onRightClickElement(event: MouseEvent) {
    this.onceClicked = false;

    event.stopImmediatePropagation();

    event.preventDefault();

    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        this._foldersService.lastSelectedFolderId = this.foldersOnPage[i].folder.id;
        break;
      }
    }

    this._rightClickService.x = event.x;
    this._rightClickService.y = event.y;

    this._rightClickService.rightClickedElement.next();
  }

  onRightClickMilk(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      event.preventDefault();

      this._rightClickService.x = event.x;
      this._rightClickService.y = event.y;

      this._rightClickService.rightClickedMilk.next();
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      console.log(event.previousContainer.data) //...OnPage
      console.log(event.container.data)

      this._foldersService.moveToFolder(event.previousContainer.data.folder.id as number, event.container.data.folder.id as number)
        .subscribe(() => {
          this.foldersOnPage = this.foldersOnPage.filter(f => {
            return f.folder.id != event.previousContainer.data.folder.id
          })
          this._foldersService.folders = this.foldersOnPage.map(f => {
            return f.folder
          })
        })
    }
  }

  isFolderPredicate(el: CdkDrag, drop: CdkDropList): boolean {
    return drop.id === 'folder';
  }
}
