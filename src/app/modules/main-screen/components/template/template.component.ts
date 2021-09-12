import {Component, EventEmitter, OnInit, SkipSelf} from '@angular/core';
import {Router} from "@angular/router";
import {RightClickService} from "../../../../shared/services/right-click.service";
import {PathService} from "../../services/path.service";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.sass']
})
export class TemplateComponent implements OnInit {
  constructor(
    private _router: Router,
    private _rightClickService: RightClickService,
    @SkipSelf() private _pathService: PathService
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
    alert('Coming soon... Stay tuned!');
  }

  goToMyCases(): void {
    this.isMenuShown = false;
    this._pathService.goToRoot();
    this._router.navigate(['browse', 'my-cases']);
  }

  goToSharedCases(): void {
    this.isMenuShown = false;
    this._pathService.goToRoot();
    this._router.navigate(['browse', 'shared-cases']);
  }

  goToTrashBin(): void {
    this.isMenuShown = false;
    this._pathService.goToRoot();
    this._router.navigate(['browse', 'trash-bin']);
  }

  goToProfile(): void {
    this.isMenuShown = false
    this._router.navigate(['browse', 'profile']);
  }

  goToRepository() {
    this.isMenuShown = false;
    this._router.navigate(['browse', 'repository']);
  }

  goToSubscription() {
    this.isMenuShown = false;

    this._router.navigate(['browse', 'subscription']);
  }

  goToSettings() {
    this.isMenuShown = false;

    this._router.navigate(['browse', 'settings']);
  }

  onRightClick(event: MouseEvent): void {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      this._rightClickService.hideAllModals();
    }
  }
}
