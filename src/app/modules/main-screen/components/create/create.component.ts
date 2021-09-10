import {Component, OnInit, SkipSelf} from '@angular/core';
import {PathService} from "../../services/path.service";
import {CaseCreatorService} from "../../services/creators/case-creator.service";
import {DeskCreatorService} from "../../services/creators/desk-creator.service";
import {FolderCreatorService} from "../../services/creators/folder-creator.service";
import {CreationResponse} from "./shared/interfaces/creation-response.interface";
import {pipe} from "rxjs";
import {map} from "rxjs/operators";
import {LockFileWithChildProcess} from "@angular/compiler-cli/ngcc/src/locking/lock_file_with_child_process";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  isRoot = false;
  isModalShown = false;

  private _creatingTarget = '';

  constructor(
    @SkipSelf() private _pathService: PathService,
    private _caseCreatorService: CaseCreatorService,
    private _folderCreatorService: FolderCreatorService,
    private _deskCreatorService: DeskCreatorService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.isRoot = this._pathService.isRoot();

    console.log(this._pathService.path)
  }

  modalClosed(result: CreationResponse): void {
    this.isModalShown = false;
    if (result) {
      switch (this._creatingTarget) {
        case 'case':
          this._caseCreatorService.create(result.data)
            .subscribe((result) => {
                console.table(result);
                this._router.navigate(['browse', 'my-cases']);
              }
            )
          break;

        case 'folder':
          break;

        case 'desk':
          break;

        default:
          break;
      }
    }
  }

  createNewCase() {
    this.isModalShown = true;
    this._creatingTarget = 'case';
  }

  createNewFolder() {
    this.isModalShown = true;
    this._creatingTarget = 'folder';
  }

  createNewDesk() {
    this.isModalShown = true;
    this._creatingTarget = 'desk';
  }
}
