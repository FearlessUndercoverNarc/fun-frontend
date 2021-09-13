import {Component, OnInit, SkipSelf} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FoldersService} from "../../services/folders.service";
import {FolderOnPage} from "../../interfaces/on-page/folder-on-page";
import {DeskOnPage} from "../../interfaces/on-page/desk-on-page";
import {CasesService} from "../../services/cases.service";
import {DesksLoaderService} from "../../services/desks-loader.service";
import {PathService} from "../../services/path.service";
import {RightClickService} from "../../../../shared/services/right-click.service";
import {DeleteService} from "../../services/delete.service";
import {TrashedFoldersService} from "../../services/trashed-folders.service";
import {TrashedDesksService} from "../../services/trashed-desks.service";

@Component({
  selector: 'app-trash-bin',
  templateUrl: './trash-bin.component.html',
  styleUrls: ['./trash-bin.component.sass']
})
export class TrashBinComponent implements OnInit {
  casesOnPage: FolderOnPage[] = [];
  foldersOnPage: FolderOnPage[] = [];
  desksOnPage: DeskOnPage[] = [];
  onceClicked: boolean = false;

  constructor(
    public dialog: MatDialog,
    @SkipSelf() private _casesService: CasesService,
    @SkipSelf() private _desksService: DesksLoaderService,
    @SkipSelf() private _pathService: PathService,
    @SkipSelf() private _foldersService: FoldersService,
    @SkipSelf() private _trashedFoldersService: TrashedFoldersService,
    @SkipSelf() private _trashedDesksService: TrashedDesksService,
    @SkipSelf() private _rightClickService: RightClickService,
    private _deleteService: DeleteService
  ) {
  }

  isModalShown: boolean = false;

  ngOnInit(): void {
    this._pathService.goToRoot();

    this._trashedFoldersService.getMyTrashBin()
      .subscribe(() => {
        console.table(this._trashedFoldersService.trashedFolders)
        this.casesOnPage = this._trashedFoldersService.trashedFolders.filter(folder => {
          return folder.parentId === null
        }).map(folder => {
          return {folder: folder, isSelected: false}
        });

        console.table(this.casesOnPage)

        this.foldersOnPage = this._trashedFoldersService.trashedFolders.filter(folder => {
          return folder.parentId!!
        }).map(folder => {
          return {folder: folder, isSelected: false}
        })
        console.table(this.foldersOnPage)
      });


    this._trashedDesksService.getMyTrashBin().subscribe(() => {
      this.desksOnPage = this._trashedDesksService.trashedDesks.map(desk => {
        return {desk: desk, isSelected: false}
      })
    })

    console.table(this.desksOnPage)

    this._deleteService.selectedElementsRecovered
      .subscribe(() => this.restoreSelectedElements())

    this._deleteService.selectedElementsDeleted
      .subscribe(() => this.removeSelectedElements())
  }

  showClearModal() {
    this.isModalShown = true;
  }

  modalClosed(result: boolean): void {
    this.isModalShown = false;
    if (result) {
      this.clearTrashBin();
    }
  }

  private clearTrashBin(): void {
    alert('Not implemented yet.');
  }


  onRightClickElement(event: MouseEvent) {
    event.stopImmediatePropagation();

    event.preventDefault();

    this._rightClickService.x = event.x;
    this._rightClickService.y = event.y;

    this._rightClickService.rightClickedTrash.next();
  }

  onRightClickMilk(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      event.preventDefault();

      this._rightClickService.x = event.x;
      this._rightClickService.y = event.y;

      this._rightClickService.rightClickedMilk.next();
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
    }
  }

  selectFolder(folderOnPage: FolderOnPage): void {
    if (!folderOnPage.isSelected) {
      this.unselectAll();

      folderOnPage.isSelected = true;
    }
  }


  private moveToTrashSelectedElements() {
    console.log('here 3')

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
        this._desksService.moveToTrashBin(this.desksOnPage[i].desk.id)
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

  unselectAll() {

    this.foldersOnPage.forEach(folder => folder.isSelected = false);

    this.desksOnPage.forEach(desk => desk.isSelected = false);
  }

  private restoreSelectedElements() {
    for (let i = 0; i < this.casesOnPage.length; i++) {
      if (this.casesOnPage[i].isSelected) {
        this._trashedFoldersService.restoreFromTrashBin(this.casesOnPage[i].folder.id)
          .subscribe(() => {
            this.casesOnPage.splice(i, 1)
          });
      }
    }

    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        this._trashedFoldersService.restoreFromTrashBin(this.foldersOnPage[i].folder.id)
          .subscribe(() => {
            this.foldersOnPage.splice(i, 1)
          });
      }
    }

    this._trashedFoldersService.trashedFolders = this.foldersOnPage.map(f => {
      return f.folder
    })

    for (let i = 0; i < this.desksOnPage.length; i++) {
      if (this.desksOnPage[i].isSelected) {
        this._trashedDesksService.restoreFromTrashBin(this.desksOnPage[i].desk.id)
          .subscribe(() => {
            this.desksOnPage.splice(i, 1);
          })
      }
    }

    this._trashedDesksService.trashedDesks = this.desksOnPage.map(d => {
      return d.desk
    })

    this.unselectAll();
  }

  private removeSelectedElements() {
    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        this._trashedFoldersService.removeFromTrashBin(this.foldersOnPage[i].folder.id)
          .subscribe(() => {
            this.foldersOnPage.splice(i, 1)
          });
      }
    }

    this._trashedFoldersService.trashedFolders = this.foldersOnPage.map(f => {
      return f.folder
    })

    for (let i = 0; i < this.desksOnPage.length; i++) {
      if (this.desksOnPage[i].isSelected) {
        this._trashedDesksService.removeFromTrashBin(this.desksOnPage[i].desk.id)
          .subscribe(() => {
            this.desksOnPage.splice(i, 1);
          })
      }
    }

    this._trashedDesksService.trashedDesks = this.desksOnPage.map(d => {
      return d.desk
    })

    this.unselectAll();
  }
}
