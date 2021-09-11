import {Component, EventEmitter, OnInit, Output, SkipSelf} from '@angular/core';
import {PathService} from "../../../services/path.service";
import {PathPart} from "../../../../../shared/interfaces/path-part.interface";

@Component({
  selector: 'app-path-line',
  templateUrl: './path-line.component.html',
  styleUrls: ['./path-line.component.sass']
})
export class PathLineComponent implements OnInit {

  pathParts: PathPart[] = [];

  constructor(
    @SkipSelf() private _pathService: PathService
  ) {
  }

  ngOnInit(): void {
    this.pathParts = this._pathService.path;
    console.table(this.pathParts)

    this._pathService.pathChanged.subscribe(() => {
      this.pathParts = this._pathService.path
    })
  }

  goToFolder(idx: number) {
    this._pathService.path = this.pathParts.slice(0, idx);
    this._pathService.pathChanged.next();
  }

  isNotRoot(): boolean {
    return !this._pathService.isRoot();
  }
}
