import {Component, OnInit, SkipSelf} from '@angular/core';
import {AccountService} from "../../../../shared/services/account.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit {
  hasSubscription: boolean = false;

  constructor(
    private _accountService: AccountService
  ) {
    // TODO: Fix strange jitter on low-width screen when activating a sub
  }

  ngOnInit(): void {
    this.hasSubscription = this._accountService.hasSubscription;
  }

  getStatus(): string {
    return this.hasSubscription ? 'Неогр. досок и неогр. карточек' : '10 досок (по 30 карточек в каждой)'
  }

  toggleSubscription() {
    this._accountService.toggleSubscription().subscribe((res) => {
      this.hasSubscription = res.isActive;
      this._accountService.hasSubscription = this.hasSubscription;
    })
  }
}
