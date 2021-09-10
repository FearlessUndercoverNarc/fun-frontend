import {Component, OnInit} from '@angular/core';
import {CaseCreatorService} from "../../../services/creators/case-creator.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'new-case-btn',
    templateUrl: './new-case-btn.component.html',
    styleUrls: ['../new-btn.style.sass']
})
export class NewCaseBtnComponent implements OnInit {

    constructor(
      private _caseCreatorService: CaseCreatorService,
      public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

}
