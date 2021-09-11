import {Component, OnInit, SkipSelf} from '@angular/core';
import {PathService} from "../../services/path.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  isRoot: boolean = false;

  constructor(
    @SkipSelf() private _pathService: PathService
  ) {
  }

  ngOnInit(): void {
    this.isRoot = this._pathService.isRoot();
  }

}
