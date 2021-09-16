import {Component, OnInit} from '@angular/core';
import {CaseCreatorService} from "../../../../services/creators/case-creator.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'new-case-btn',
    templateUrl: './new-case-button.component.html',
    styleUrls: ['../../styles/new-button.style.sass']
})
export class NewCaseButtonComponent implements OnInit {

    constructor(
      private _caseCreatorService: CaseCreatorService,
      public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

}
