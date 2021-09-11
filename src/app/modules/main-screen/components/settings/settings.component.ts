import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let languageItem = document.querySelectorAll('.language .preview-language__text');
    languageItem.forEach(element => {
      element.addEventListener('click', () => {
        languageItem[0].innerHTML = element.innerHTML
      })
    });
    
    let uiItems = document.querySelectorAll('.ui .preview-ui__text');
    uiItems.forEach(element => {
      element.addEventListener('click', () => {
        uiItems[0].innerHTML = element.innerHTML
      })
    });
  }

}


