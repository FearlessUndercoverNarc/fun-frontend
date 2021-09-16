import {Component, OnInit} from '@angular/core';
import {PathService} from "../../../../services/path.service";
import {CaseCreatorService} from "../../../../services/creators/case-creator.service";
import {DeskCreatorService} from "../../../../services/creators/desk-creator.service";
import {FolderCreatorService} from "../../../../services/creators/folder-creator.service";
import {CreationResponse} from "../../interfaces/creation-response.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  isRoot = false;
  isCaseModalShown = false;
  isFolderModalShown = false;
  isDeskModalShown = false;

  private _creatingTarget = '';
  isFolderEditShown: boolean = false;
  isDeskEditShown: boolean = false;

  constructor(
    private _pathService: PathService,
    private _caseCreatorService: CaseCreatorService,
    private _folderCreatorService: FolderCreatorService,
    private _deskCreatorService: DeskCreatorService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.isRoot = this._pathService.isRoot();
  }

  modalClosed(result: CreationResponse): void {
    this.isCaseModalShown = false;

    switch (this._creatingTarget) {
      case 'case':
        if (result.agreed) {
          console.log('case: case')
          this._caseCreatorService.create(result.data)
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

      case 'folder':
        this.isFolderModalShown = false;
        if (result.agreed) {
          console.log('case: folder')
          console.table(result.data);
          this._folderCreatorService.create(result.data)
            .subscribe((response) => {
              console.log('folder was created!')
              console.table(response);
              //
              // const newPathPart: PathPart = {
              //   folderId: response.id,
              //   folderTitle: result.data!.title
              // }
              //
              // this._pathService.deeper(newPathPart);
              //
              this._router.navigate(['browse', 'my-cases']);
            })
        }
        break;

      case 'desk':
        this.isDeskModalShown = false;
        if (result.agreed) {
          console.log('case: desk')
          this._deskCreatorService.create(result.data)
            .subscribe(() => {
              this._router.navigate(['browse', 'my-cases']);
            })
        }
        break;

      default:
        break;
    }
  }

  createNewCase() {
    this.isCaseModalShown = true;
    this._creatingTarget = 'case';
  }

  createNewFolder() {
    this.isFolderModalShown = true;
    this._creatingTarget = 'folder';
  }

  createNewDesk() {
    this.isDeskModalShown = true;
    this._creatingTarget = 'desk';
  }
}
