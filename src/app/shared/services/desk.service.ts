import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { ApiAreas } from "../enums/api-areas.enum";
import { APIControllers } from "../enums/api-controllers.enum";
import { Desk } from "../interfaces/desk.interface";
import { BasicCRUD } from "./basic-crud.service";
import {AccountService} from "./account.service";
import { environment } from "src/environments/environment";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class DeskService extends BasicCRUD<Desk> {

  eventSource = {} as EventSource

  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService,
    private _ngZone: NgZone
  ) {
    super(APIControllers.Desk, _httpClient, _accountService);
  }

  onDeskUpdate$: Subject<any> = new Subject<any>()


  createSSEConnection(id: number) {
    this.eventSource = new EventSource(`${environment.apiUrl}/v1/deskaction/sse?id=${id}`)

    console.log(this.eventSource)

    this.eventSource.onmessage = (message) => {
      this._ngZone.run(() => {
        this.onDeskUpdate$.next()
      })
    }
  }

  closeSSEConnection() {
    if (!this.eventSource) return;
    this.eventSource.close()
  }

}
