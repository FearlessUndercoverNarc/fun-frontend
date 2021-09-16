import {Component, OnInit, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from "../../../../../../shared/services/account.service";
import {Md5} from 'ts-md5/dist/md5';
import {LoginDto} from "../../../../../../shared/interfaces/dto/login-dto.interface";
import {PathService} from "../../../../../main-screen/services/path.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  validators = [Validators.required]
  authFormGroup: FormGroup = new FormGroup({
    'login': new FormControl('', this.validators),
    'password': new FormControl('', this.validators),
  })
  isFormSent: boolean = false

  constructor(
    private _router: Router,
    @SkipSelf() private _accountService: AccountService,
    @SkipSelf() private _pathService: PathService
  ) {
  }

  ngOnInit(): void {
    this._accountService.authPageEntered();
  }

  auth(): void {
    if (this.authFormGroup.invalid) {
      return
    }

    const values = this.extrudeValues();

    this.isFormSent = true

    this._accountService.login(values)
      .subscribe(() => {
          this.isFormSent = false
          this._pathService.goToRoot();
          this._router.navigate(['browse'])
        },

        () => {
          this.isFormSent = false
        })
  }

  private extrudeValues(): any {
    const values = {...this.authFormGroup.value} as LoginDto
    values.password = new Md5().appendStr(values.password).end().toString()
    return values;
  }

  register(): void {
    this._router.navigate(['register']);
  }
}
