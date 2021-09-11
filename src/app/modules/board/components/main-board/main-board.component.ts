import { Route } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { switchMap } from 'rxjs/operators';
import { Card } from 'src/app/shared/interfaces/card.interface';
import { Desk } from 'src/app/shared/interfaces/desk.interface';
import { DeskService } from 'src/app/shared/services/desk.service';


interface Position {
  top: number,
  left: number,
  x: number,
  y: number,
  offsetX: number,
  offsetY: number,
}

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.sass']
})
export class MainBoardComponent implements OnInit, AfterViewInit {

  desk = {} as Desk

  isCursorDown: boolean = false
  isDragging: boolean = false

  @ViewChild(PerfectScrollbarComponent) board?: PerfectScrollbarComponent
  @ViewChild('mainContainer') mainContainer: any
  @ViewChild('canvas') canvas: any

  position: Position = {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0
  }

  zoom: number = 1

  cards: Card[] = [
    {
      id: 1,
      x: 5000,
      y: 5000
    },
    {
      id: 2,
      x: 5500,
      y: 5500
    },
  ]

  draggingCard = {} as Card

  draggingPosition: Position = {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _deskService: DeskService
  ) { }

  ngOnInit(): void {
    this._route.params
    .pipe(
      switchMap(params => {
        return this._deskService.getById(params.id)
      })
    )
    .subscribe(desk => {
      this.desk = desk
    }, error => {
      this._router.navigate(['/'])
    })
  }

  ngAfterViewInit() {
    this.board?.directiveRef?.scrollTo(4800, 4800)
  }

  mouseMoveHandler(event: any) {
    event.preventDefault()

    if (!this.isCursorDown) return

    if (!this.isDragging) {
      const deltaX = this.position.x - event.clientX
      const deltaY = this.position.y - event.clientY

      this.board?.directiveRef?.scrollTo(this.position.left + deltaX, this.position.top + deltaY)
    } else {
      const deltaX = this.draggingPosition.left + event.clientX
      const deltaY = this.draggingPosition.top + event.clientY

      this.draggingCard.x = deltaX - this.draggingPosition.offsetX
      this.draggingCard.y = deltaY - 50 - (this.draggingPosition.offsetY)

      console.log(deltaY, this.draggingPosition.offsetY)
    }
  }

  mouseUpHandler(event: any) {
    this.isCursorDown = false

    this.mainContainer.nativeElement.style.cursor = 'default';
  }

  mouseDownHandler(event: any) {

    this.mainContainer.nativeElement.style.cursor = 'grabbing';

    this.isCursorDown = true

    this.position = this.getCursorPosition(event)
    this.draggingPosition = this.getCursorPosition(event)

    console.log(event)
  }

  getCursorPosition(event: any): Position {

    const position = this.board?.directiveRef?.position(true)

    return {
      left: typeof position?.x == 'number' ? (0 || position?.x) : 0,
      top: typeof position?.y == 'number' ? (0 || position?.y) : 0,
      x: event.clientX,
      y: event.clientY,
      offsetX: event.offsetX,
      offsetY: event.offsetY,
    }
  }

  scrollHandler(direction: number) {

    if (this.isCursorDown) return

    this.zoom += direction

    this.canvas.nativeElement.style.zoom = '' + this.zoom
  }

  onDragStarted(id: number) {
    this.isDragging = true

    this.draggingCard = this.cards.find(card => card.id == id) || {} as Card
  }

  onDragStopped(id: number) {
    this.isDragging = false
  }

}
