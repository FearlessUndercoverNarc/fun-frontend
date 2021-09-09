import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  goToMyCases(): void {
    this._router.navigate(['browse', 'my-cases']);
  }
  goToSharedCases(): void {
    this._router.navigate(['browse', 'shared-cases']);
  }
  goToTrashBin(): void {
    this._router.navigate(['browse', 'trash-bin']);
  }
}
