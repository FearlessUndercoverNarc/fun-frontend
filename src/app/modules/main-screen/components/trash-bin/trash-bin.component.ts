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
import {LinkerEnvironment} from "@angular/compiler-cli/linker";

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
    @SkipSelf() private _rightClickService: RightClickService,
    private _deleteService: DeleteService
  ) {
  }

  isModalShown: boolean = false;

  ngOnInit(): void {
    this._foldersService.loadTrashedFolders()
      .subscribe(() => {
        console.table(this._foldersService.trashedFolders)
        this.casesOnPage = this._foldersService.trashedFolders.filter(tc => {
          return tc.parentId === null
        }).map(tc => {
          return {folder: tc, isSelected: false}
        });

        console.table(this.casesOnPage)

        this.foldersOnPage = this._foldersService.trashedFolders.filter(tf => {
          return tf.parentId!!
        }).map(tf => {
          return {folder: tf, isSelected: false}
        })
        console.table(this.foldersOnPage)
      });


    this._desksService.loadTrashedDesks().subscribe(() => {
      this.desksOnPage = this._desksService.desks.map(d => {
        return {desk: d, isSelected: false}
      })
    })

    console.table(this.desksOnPage)
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
    this.onceClicked = false;

    event.stopImmediatePropagation();

    event.preventDefault();

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

  selectFolder(folderOnPage: FolderOnPage): void {
    if (!folderOnPage.isSelected) {
      this.unselectAll();

      folderOnPage.isSelected = true;

      this.onceClicked = true;
    } else {
      if (this.onceClicked) {
        this.onceClicked = false;
        this._rightClickService.hideAllModals();
        alert('line 124');
        // this.openSubFolder(folderOnPage.folder);
      }
    }
  }


  private deleteSelectedElements() {
    console.log('here 3')

    console.table(this.foldersOnPage);

    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        this._foldersService.moveToTrash(this.foldersOnPage[i].folder.id)
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
        this._desksService.moveToTrash(this.desksOnPage[i].desk.id)
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
    for (let folder of this.foldersOnPage) {
      folder.isSelected = false;
    }

    for (let desk of this.desksOnPage) {
      desk.isSelected = false;
    }
  }
}
