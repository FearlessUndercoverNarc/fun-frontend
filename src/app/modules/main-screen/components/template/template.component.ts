import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {
  constructor(
    private _router: Router
  ) {
  }

  isMenuShown: boolean = false;
  isSearchShown: boolean = false;

  ngOnInit(): void {
  }


  toggleNavMenu(): void {
    this.isMenuShown = !this.isMenuShown;
  }

  toggleSearchBar(): void {
    this.isSearchShown = !this.isSearchShown;
  }

  goToCreate() {
    this.toggleNavMenu();

    this._router.navigate(['browse', 'create'])
  }

  goToRecent() {
    this.toggleNavMenu();
    alert('Not implemented yet.');
  }

  goToMyCases(): void {
    this.toggleNavMenu();
    this._router.navigate(['browse', 'my-cases']);
  }

  goToSharedCases(): void {
    this.toggleNavMenu();
    this._router.navigate(['browse', 'shared-cases']);
  }

  goToTrashBin(): void {
    this.toggleNavMenu();
    this._router.navigate(['browse', 'trash-bin']);
  }

  goToProfile(): void {
    this._router.navigate(['browse', 'profile']);
  }

  goToRepository() {
    this.toggleNavMenu();
    this._router.navigate(['browse', 'repository']);
  }

  goToSubscription() {
    this.toggleNavMenu();

    this._router.navigate(['browse', 'subscription']);
  }

  goToSettings() {
    this.toggleNavMenu();

    this._router.navigate(['browse', 'settings']);
  }
}
