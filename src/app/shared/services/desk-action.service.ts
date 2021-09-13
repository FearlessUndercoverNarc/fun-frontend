import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { APIControllers } from "../enums/api-controllers.enum";
import { BasicCRUD } from "./basic-crud.service";
import { AccountService } from "./account.service";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { DeskAction } from "../interfaces/desk-action.interface";

@Injectable({ providedIn: 'root' })
export class DeskActionService extends BasicCRUD<DeskAction> {

    eventSource = {} as EventSource

    constructor(
        private _httpClient: HttpClient,
        protected _accountService: AccountService,
    ) {
        super(APIControllers.DeskAction, _httpClient, _accountService);
    }

    getAllByDesk(id: number): Observable<DeskAction[]> {
        return this._httpClient.get<DeskAction[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/GetAllByDesk`, { params: { id: id + '' } })
    }
}
