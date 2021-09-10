import {Component, OnInit} from '@angular/core';
import {CaseCreatorService} from "../../../services/case-creator.service";
import {MatDialog} from "@angular/material/dialog";
import {CaseCreatorDialogComponent} from "../shared/components/case-creator-dialog/case-creator-dialog.component";

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

  //
  // showCreatorDialog() {
  //   const dialogRef = this.dialog.open(CaseCreatorDialogComponent);
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
