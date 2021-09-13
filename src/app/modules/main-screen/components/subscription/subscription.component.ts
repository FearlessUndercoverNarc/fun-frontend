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
    @SkipSelf() private _accountService: AccountService
  ) {
  }

  ngOnInit(): void {
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
