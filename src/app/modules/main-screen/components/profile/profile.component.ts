import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountService} from 'src/app/shared/services/account.service';
import {Md5} from 'ts-md5';
import {AccountDto, UpdateAccountDto} from "../../../../shared/interfaces/account-dto.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  fio: string = ''
  newPass: string = ''
  newPassR: string = ''

  profile = {} as AccountDto

  constructor(
    private _accountService: AccountService,
    private _matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const profileButton = document.querySelector('.settings-profile__button');
    let profileItemShow = document.querySelectorAll('.settings-profile__itemSwitch');
    profileButton?.addEventListener('click', () => {
      // profileItemShow[0].classList.toggle('_active');
      // profileItemShow[0].classList.contains('_active') ? profileButton.innerHTML = 'Сохранить': profileButton.innerHTML = 'Изменить пароль';
    });

    this._accountService.getMy()
      .subscribe(profile => {
        this.profile = profile

        this.fio = profile.fio
      })

  }

  changePassword() {
    if (this.newPass != this.newPassR) {
      this._matSnackBar.open('Пароли не совпадают', '', {duration: 3000})
      return
    }

    let updateDto: UpdateAccountDto = {
      fio: this.profile.fio,
      password: new Md5().appendStr(this.newPass).end().toString()
    }

    this._accountService.update(updateDto)
      .subscribe(() => {
        this._matSnackBar.open('Вы успешно изменили пароль', '', {duration: 3000})
        this.newPass = ''
        this.newPassR = ''
      }, error => {
        this._matSnackBar.open(error.error.error, '', {duration: 3000})
      })
  }

  update() {
    let updateDto: UpdateAccountDto = {fio: this.fio, password: ''};
    this._accountService.update(updateDto)
      .subscribe(() => {
        this._matSnackBar.open('Вы успешно изменили ФИО', '', {duration: 3000})
        this.newPass = ''
        this.newPassR = ''
      }, error => {
        this._matSnackBar.open(error.error.error, '', {duration: 3000})
      })
  }

  logout() {
    this._accountService.logoutAndNavigateToAuth();
  }
}
