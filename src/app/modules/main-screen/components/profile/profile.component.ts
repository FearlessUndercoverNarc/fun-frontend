import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from 'src/app/shared/interfaces/profile.interface';
import { AccountService } from 'src/app/shared/services/account.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  fio: string = ''
  newPass: string = ''
  newPassR: string = ''
  
  profile = {} as Profile

  constructor(
    private _accountService: AccountService,
    private _matSnackBar: MatSnackBar
  ) { }

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

    this._accountService.update({...this.profile, password: new Md5().appendStr(this.newPass).end().toString()})
    .subscribe(() => {
      this._matSnackBar.open('Вы успешно изменили пароль', '', {duration: 3000})
      this.newPass = ''
      this.newPassR = ''
    }, error => {
      this._matSnackBar.open(error.error.error, '', {duration: 3000})
    })
  }

  update() {
    this._accountService.update({fio: this.fio, password: ''})
    .subscribe(() => {
      this._matSnackBar.open('Вы успешно изменили ФИО', '', {duration: 3000})
      this.newPass = ''
      this.newPassR = ''
    }, error => {
      this._matSnackBar.open(error.error.error, '', {duration: 3000})
    })
  }

}
