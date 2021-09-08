import {Component, OnInit, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccountService} from "../../../../shared/services/account.service";
import {Md5} from 'ts-md5/dist/md5';
import {LoginDto} from "../../../../shared/interfaces/dto/login-dto.interface";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../shared/styles/auth-register.styles.sass']
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
    @SkipSelf() private _accountService: AccountService
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
          this._router.navigate(['cases'])
        },

        error => {
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
