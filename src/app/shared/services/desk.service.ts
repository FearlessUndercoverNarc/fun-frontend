import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiAreas } from "../enums/api-areas.enum";
import { APIControllers } from "../enums/api-controllers.enum";
import { Desk } from "../interfaces/desk.interface";
import { BasicCRUD } from "./basic-crud.service";

@Injectable({providedIn: 'root'})
export class DeskService extends BasicCRUD<Desk> {

  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.Desk, _httpClient, _accountService);
  }
}
