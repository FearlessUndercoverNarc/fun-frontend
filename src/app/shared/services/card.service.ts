import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIControllers } from "../enums/api-controllers.enum";
import { BasicCRUD } from "./basic-crud.service";
import { AccountService } from "./account.service";
import { Card } from "../interfaces/card.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class CardService extends BasicCRUD<Card> {

    constructor(
        private _httpClient: HttpClient,
        protected _accountService: AccountService
    ) {
        super(APIControllers.Card, _httpClient, _accountService);
    }


    getAllByDesk(id: number): Observable<Card[]> {
        return this._httpClient.get<Card[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/GetAllByDesk`, {params: {id: id+''}})
    }
}
