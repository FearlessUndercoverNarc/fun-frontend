import {Component, OnInit, SkipSelf} from '@angular/core';
import {CasesService} from "../../services/cases.service";
import {FolderDto} from "../../interfaces/dto/folder-dto.interface";

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.sass']
})
export class MyCasesComponent implements OnInit {

  cases: FolderDto[] = [];

  constructor(
    @SkipSelf() private _casesService: CasesService
  ) {
  }

  ngOnInit(): void {
    this._casesService.loadCases()
      .subscribe(() => {
        this.cases = this._casesService.cases;
      }, error => {
        console.log(error)
      })
  }

}
