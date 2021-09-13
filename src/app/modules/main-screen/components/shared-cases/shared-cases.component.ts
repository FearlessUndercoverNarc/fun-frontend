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
import {DeskService} from 'src/app/shared/services/desk.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-shared-cases',
  templateUrl: './shared-cases.component.html',
  styleUrls: ['./shared-cases.component.sass']
})
export class SharedCasesComponent implements OnInit {
  casesOnPage: FolderOnPage[] = [];
  foldersOnPage: FolderOnPage[] = [];
  desksOnPage: DeskOnPage[] = [];

  onceClicked: boolean = false;
  isDragging: boolean = false;

  constructor(
    @SkipSelf() private _casesService: CasesService,
    @SkipSelf() private _desksService: DesksLoaderService,
    private _deskService: DeskService,
    @SkipSelf() private _pathService: PathService,
    @SkipSelf() private _foldersService: FoldersService,
    @SkipSelf() private _trashedFoldersService: FolderTrashBinService,
    @SkipSelf() private _trashedDesksService: DeskTrashBinService,
    @SkipSelf() private _rightClickService: RightClickService,
    @SkipSelf() private _shareModalService: ShareModalService,
    private _router: Router,
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
      .subscribe(() => this.moveToTrashBinSelectedElements())
  }

  private moveToTrashBinSelectedElements() {
    console.table(this.foldersOnPage);

    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        this._trashedFoldersService.moveToTrashBin(this.foldersOnPage[i].folder.id)
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

  exportElement() {
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
    a.remove();
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

        this._router.navigate(['board', deskOnPage.desk.id.toString()])
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
    this.foldersOnPage = []
    this.desksOnPage = []

    this._foldersService.loadSharedSubFolders(subFolderId)
      .subscribe(() => {
        this.foldersOnPage = this._foldersService.foldersShared.map(f => {
          return {folder: f, isSelected: false};
        })
      }, error => {
        alert('ERROR. Check console for details.');
        console.log(error);
      });

    this._desksService.loadSharedDesksInFolder(subFolderId)
      .subscribe(() => {
        this.desksOnPage = this._desksService.desksShared.map(d => {
          return {desk: d, isSelected: false}
        })
      })
  }

  getHeaderTitle(): string {
    return this._pathService.isRoot() ? 'Дела' : 'Папки';
  }

  private loadAllElements() {
    if (this._pathService.isRoot()) {
      this.loadRoot()
    } else {
      this._casesService.sharedToMeRoot = [];
      this.casesOnPage = [];

      this.processSubFolder(this._pathService.parentFolderId);
    }
  }

  onRightClickElement(event: MouseEvent) {
    this.onceClicked = false;

    event.stopImmediatePropagation();

    event.preventDefault();

    let firstSelectedFolder = this.foldersOnPage.find(folderOnPage => folderOnPage.isSelected);

    if (firstSelectedFolder) this._foldersService.lastSelectedFolderId = firstSelectedFolder.folder.id;


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
          this.foldersOnPage = this.foldersOnPage.filter(folderOnPage => {
            return folderOnPage.folder.id != event.previousContainer.data.folder.id
          })
          this._foldersService.foldersShared = this.foldersOnPage.map(folderOnPage => {
            return folderOnPage.folder
          })
        }, error => {
          console.table(error)
        })
    }

  }

  isFolderPredicate(el: CdkDrag, drop: CdkDropList): boolean {
    return drop.id === 'folder';
  }

  private loadRoot() {
    this._foldersService.getSharedToMeRoot()
      .subscribe(() => {
        this.casesOnPage = this._foldersService.foldersShared.filter(folderOnPage => {
          return folderOnPage.parentId === null
        }).map(folderOnPage => {
          return {folder: folderOnPage, isSelected: false}
        });

        this.foldersOnPage = this._foldersService.foldersShared.filter(folderOnPage => {
          return folderOnPage.parentId!!
        }).map(folderOnPage => {
          return {folder: folderOnPage, isSelected: false}
        })
      }, error => {
        console.log(error)
      })

    this._desksService.getSharedToMe().subscribe(() => {
      this.desksOnPage = this._desksService.desksShared.map(desk => {
        return {desk: desk, isSelected: false}
      })
    })
  }
}
