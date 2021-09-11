import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { map, switchMap } from 'rxjs/operators';
import { CardConnection } from 'src/app/shared/interfaces/card-connection.interface';
import { Card } from 'src/app/shared/interfaces/card.interface';
import { Desk } from 'src/app/shared/interfaces/desk.interface';
import { CardConnectionService } from 'src/app/shared/services/card-connection.service';
import { CardService } from 'src/app/shared/services/card.service';
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
  isLoaded: boolean = false

  isCursorDown: boolean = false
  isDragging: boolean = false
  isConnectingCards: boolean = false

  @ViewChild(PerfectScrollbarComponent) board?: PerfectScrollbarComponent
  @ViewChild('mainContainer') mainContainer: any
  @ViewChild('canvas') canvas: any

  position = {} as Position

  zoom: number = 1

  cards: Card[] = []
  cardConnections: CardConnection[] = []

  draggingCard = {} as Card
  draggingPosition = {} as Position
  creatingCardConnection = {cardLeftId: -1} as CardConnection

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _deskService: DeskService,
    private _cardService: CardService,
    private _cardConnectionService: CardConnectionService,
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

      this._cardService.getAllByDesk(this.desk.id)
      .subscribe(cards => {
        this.cards = cards

        this._cardConnectionService.getAllByDesk(this.desk.id)
        .pipe(
          map(connections => {
            return connections.map(conn => {
              const leftCard = this.getCardById(conn.cardLeftId)
              const rightCard = this.getCardById(conn.cardRightId)

              conn.x1 = leftCard.x
              conn.y1 = leftCard.y

              conn.x2 = rightCard.x
              conn.y2 = rightCard.y

              return conn
            })
          })
        )
        .subscribe(cardConnections => {

          this.cardConnections = cardConnections
          console.log(cardConnections)
          
          setTimeout(() => {
            this.board?.directiveRef?.scrollTo(4800, 4800)
          }, 100)

          this.isLoaded = true
        })

        

      }, error => {
        this._router.navigate(['/'])
      })

      

    }, error => {
      this._router.navigate(['/'])
    })
  }

  ngAfterViewInit() {
  }

  mouseMoveHandler(event: any) {
    event.preventDefault()

    if (!this.isCursorDown && !this.isConnectingCards) return

    console.log(this.isConnectingCards)
    if (this.isConnectingCards) {

      const leftCard = this.getCardById(this.creatingCardConnection.cardLeftId)

      this.creatingCardConnection.x2 = 
      event.clientX + leftCard.x
      - (document.getElementById(`card${leftCard.id || 0}`)?.offsetWidth || 0);

      this.creatingCardConnection.y2 = event.clientY + leftCard.y
      - (document.getElementById(`card${leftCard.id || 0}`)?.offsetHeight || 0) - 50;

    } else if (!this.isDragging) {
      const deltaX = this.position.x - event.clientX
      const deltaY = this.position.y - event.clientY

      this.board?.directiveRef?.scrollTo(this.position.left + deltaX, this.position.top + deltaY)
    }
    else {
      const deltaX = this.draggingPosition.left + event.clientX
      const deltaY = this.draggingPosition.top + event.clientY

      this.draggingCard.x = deltaX - this.draggingPosition.offsetX
      this.draggingCard.y = deltaY - 50 - (this.draggingPosition.offsetY)

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

    this._cardService.update(this.getCardById(id))
    .subscribe(() => {
    })
  }

  onConnectionButtonClicked(id: number) {

    if (this.creatingCardConnection.cardLeftId == -1) {
      this.isConnectingCards = true

      this.creatingCardConnection.cardLeftId = id

      this.mainContainer.nativeElement.style.cursor = 'crosshair';

      this.creatingCardConnection.x1 = this.getCardById(this.creatingCardConnection.cardLeftId).x
      this.creatingCardConnection.y1 = this.getCardById(this.creatingCardConnection.cardLeftId).y
    
    } else {
      this.isConnectingCards = false
      this.creatingCardConnection.cardRightId = id

      this.creatingCardConnection.x2 = this.getCardById(this.creatingCardConnection.cardRightId).x
      this.creatingCardConnection.y2 = this.getCardById(this.creatingCardConnection.cardRightId).y

      this.mainContainer.nativeElement.style.cursor = 'default';

      this._cardConnectionService.create(this.creatingCardConnection)
      .subscribe(() => {
        this.isConnectingCards = false

        this.cardConnections.push({...this.creatingCardConnection})

        this.creatingCardConnection.cardLeftId = -1
      })
    }

    console.log(this.creatingCardConnection)
  }

  getCardById(id: number): Card {
    return this.cards.find(card => card.id == id) || {} as Card
  }

  removeConnection(id: number) {
    this._cardConnectionService.remove(id)
    .subscribe(() => {
      this.cardConnections = this.cardConnections.filter(connection => connection.id != id)
    })
  }


}
