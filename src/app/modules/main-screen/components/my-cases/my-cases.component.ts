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
import {Router} from "@angular/router";

import {ImportService} from '../../services/import.service';
import {DeskService} from 'src/app/shared/services/desk.service';
import {CreationResponse} from "../create/shared/interfaces/creation-response.interface";
import {EditElementsService} from "../../../../shared/services/edit-elements.service";
import {EditedResponse} from "../../../../shared/interfaces/edited-response";


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
    @SkipSelf() private _trashedFoldersService: TrashedFoldersService,
    @SkipSelf() private _trashedDesksService: TrashedDesksService,
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

  ngOnInit(): void {

    // this._pathService.goToRoot();

    this.loadAllElements();

    this._pathService.pathChanged.subscribe(() => {
      this.loadAllElements()
    });

    this._deleteService.selectedElementsToTrashbinMoved
      .subscribe(() => this.moveToTrashbinSelectedElements())

    this._importService.selectedElementsExported
      .subscribe(() => this.exportElement())

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

  exportElement() {
    for (let i = 0; i < this.foldersOnPage.length; i++) {
      if (this.foldersOnPage[i].isSelected) {
        console.log('EXPORTED WITH ID', this.foldersOnPage[i].folder.id)

        this._foldersService.export(this.foldersOnPage[i].folder.id)
          .subscribe(response => {
            this.downloadFile(JSON.stringify(response), 'export_folder_' + this.foldersOnPage[i].folder.id, 'text/plain')
          })

      }
    }

    for (let i = 0; i < this.desksOnPage.length; i++) {
      console.log('?')
      if (this.desksOnPage[i].isSelected) {
        console.log('dick')
        this._deskService.doExport(this.desksOnPage[i].desk.id)
          .subscribe(response => {
            this.downloadFile(JSON.stringify(response), 'export_desk_' + this.desksOnPage[i].desk.id, 'text/plain')
          })
      }
    }
  }

  downloadFile(content: string, fileName: string, contentType: string) {
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

  onRightClickElement(event: MouseEvent, itemId: number, isFolder: boolean) {
    this.onceClicked = false;

    event.stopImmediatePropagation();

    event.preventDefault();

    console.log('id: ' + itemId.toString())
    console.log('isFolder: ' + isFolder)
    this._foldersService.lastSelectedFolderId = itemId;
    this._foldersService.isFolderSelected = isFolder;

    // for (let i = 0; i < this.foldersOnPage.length; i++) {
    //   if (this.foldersOnPage[i].isSelected) {
    //     this._foldersService.lastSelectedFolderId = this.foldersOnPage[i].folder.id;
    //     this._foldersService.isFolderSelected = true;
    //     break;
    //   }
    // }
    //
    // for (let i = 0; i < this.desksOnPage.length; i++) {
    //   if (this.desksOnPage[i].isSelected) {
    //     this._foldersService.lastSelectedFolderId = this.desksOnPage[i].desk.id;
    //     this._foldersService.isFolderSelected = false;
    //     break;
    //   }
    // }

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
      console.log() //...OnPage
      console.log(event.container.data)

      if (typeof event.previousContainer.data?.desk === 'object') {
        this._desksService.moveToFolder(event.previousContainer.data.desk.id as number, event.container.data.folder.id as number)
          .subscribe(() => {
            this.foldersOnPage = this.foldersOnPage.filter(f => {
              return f.folder.id != event.previousContainer.data.desk.id
            })
            this._foldersService.folders = this.foldersOnPage.map(f => {
              return f.folder
            })
          })
      } else {
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

      this.loadAllElements();
    }
  }

  isFolderPredicate(el: CdkDrag, drop: CdkDropList): boolean {
    return drop.id === 'folder';
  }

  modalClosed(result: EditedResponse): void {
    this._editElementsService.hide();

    console.log(result)

    switch (this._creatingTarget) {
      case 'folder':
        if (result.agreed) {
          this._foldersService.update(result.data)
            .subscribe((response) => {
                console.log('case was created!')
                console.table(response);

                // const newPathPart: PathPart = {
                //   folderId: response.id,
                //   folderTitle: result.data!.title
                // }
                //
                // this._pathService.deeper(newPathPart);

                this._router.navigate(['browse', 'my-cases']);
              }
            )
        }
        break;

      case 'desk':
        if (result.agreed) {
          this._desksService.update(result.data)
            .subscribe((response) => {
                console.log('case was created!')
                console.table(response);

                // const newPathPart: PathPart = {
                //   folderId: response.id,
                //   folderTitle: result.data!.title
                // }
                //
                // this._pathService.deeper(newPathPart);

                this._router.navigate(['browse', 'my-cases']);
              }
            )
        }
        break;
    }

    this.loadAllElements();
  }
}
