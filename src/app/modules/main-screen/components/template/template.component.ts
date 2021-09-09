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

  isMenuShown: boolean = false;
  isSearchShown: boolean = false;

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

  toggleNavMenu(): void {
    this.isMenuShown = !this.isMenuShown;
  }

  toggleSearchBar(): void {
    this.isSearchShown = !this.isSearchShown;
  }
}
