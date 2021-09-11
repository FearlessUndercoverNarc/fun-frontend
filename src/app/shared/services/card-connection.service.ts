import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIControllers } from "../enums/api-controllers.enum";
import { BasicCRUD } from "./basic-crud.service";
import { AccountService } from "./account.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CardConnection } from "../interfaces/card-connection.interface";

@Injectable({ providedIn: 'root' })
export class CardConnectionService extends BasicCRUD<CardConnection> {

    constructor(
        private _httpClient: HttpClient,
        protected _accountService: AccountService
    ) {
        super(APIControllers.CardConnection, _httpClient, _accountService);
    }


    getAllByDesk(id: number): Observable<CardConnection[]> {
        return this._httpClient.get<CardConnection[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/GetAllByDesk`, {params: {id: id+''}})
    }
}
