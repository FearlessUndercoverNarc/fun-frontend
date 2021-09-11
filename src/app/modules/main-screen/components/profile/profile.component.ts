import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const profileButton = document.querySelector('.settings-profile__button');
    let profileItemShow = document.querySelectorAll('.settings-profile__itemSwitch');
    profileButton?.addEventListener('click', () => {
      profileItemShow[0].classList.toggle('_active');
      profileItemShow[0].classList.contains('_active') ? profileButton.innerHTML = 'Сохранить': profileButton.innerHTML = 'Изменить пароль';
    });

  }

}
