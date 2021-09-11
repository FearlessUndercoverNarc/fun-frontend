import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-trash-bin',
  templateUrl: './trash-bin.component.html',
  styleUrls: ['./trash-bin.component.sass']
})
export class TrashBinComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {
  }

  isModalShown: boolean = false;

  ngOnInit(): void {
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
}
