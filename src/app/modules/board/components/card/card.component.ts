import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Card } from 'src/app/shared/interfaces/card.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  displayModal: boolean = false
  baseUrl: string = `${environment.apiUrl}/images/Cards/`

  @Output() onDragStarted: EventEmitter<number> = new EventEmitter<number>()
  @Output() onDragStopped: EventEmitter<number> = new EventEmitter<number>()
  @Output() onConnectionClicked: EventEmitter<number> = new EventEmitter<number>()

  @Input() card = {} as Card
  @Input() deskId: number = 1

  isDragging: boolean = false

  constructor() { }

  ngOnInit(): void {
    console.log(this.card)
  }

  startDragging() {
    this.isDragging = true
    this.onDragStarted.emit(this.card.id)
  }

  stopDragging() {
    this.isDragging = false
    this.onDragStopped.emit(this.card.id)
  }


  connectionClicked(event: any) {
    event.preventDefault()
    this.onConnectionClicked.emit(this.card.id)
  }

  openModal() {
    this.displayModal = true
  }

}
