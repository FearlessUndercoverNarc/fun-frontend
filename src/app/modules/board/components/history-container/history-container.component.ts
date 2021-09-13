import {Component, Input, OnInit} from '@angular/core';
import {DeskAction} from 'src/app/shared/interfaces/desk-action.interface';
import {DeskActionService} from 'src/app/shared/services/desk-action.service';
import {DeskService} from 'src/app/shared/services/desk.service';

@Component({
  selector: 'app-history-container',
  templateUrl: './history-container.component.html',
  styleUrls: ['./history-container.component.sass']
})
export class HistoryContainerComponent implements OnInit {

  keyvalues = new Map([
    [0, 'DeskInit'],
    [1, 'DeskUpdate'],
    [2, 'Создание карточки'],
    [3, 'Соединение'],
    [4, 'Отсоединение'],
    [5, 'Удаление карточки'],
    [6, 'Обновление/перемещение']
  ])

  @Input() deskId: number = 0
  actions: DeskAction[] = []
  isLoading: boolean = false

  constructor(
    private _deskActionService: DeskActionService,
    private _deskService: DeskService
  ) {
  }

  ngOnInit(): void {

    this._deskService.onDeskUpdate$.subscribe(() => {
      this.loadHistory()
    })

    this.loadHistory()
  }

  loadHistory() {
    this.isLoading = true
    this._deskActionService.getAllByDesk(this.deskId)
      .subscribe(actions => {
        this.actions = actions
        this.isLoading = false;
      })
  }

}
