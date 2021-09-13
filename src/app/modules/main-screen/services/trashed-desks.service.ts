import {Injectable} from "@angular/core";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {AccountService} from "../../../shared/services/account.service";
import {HttpClient} from "@angular/common/http";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {DeskDto} from "../interfaces/dto/desk-dto.interface";
import {Desk} from "../../../shared/interfaces/desk.interface";

@Injectable({
  providedIn: 'root'
})
export class TrashedDesksService extends BasicCRUD<any> {
  private _trashedDesks: DeskDto[] = [];

  constructor(
    protected _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.DeskTrashbin, _httpClient, _accountService);
  }

  set trashedDesks(cases: DeskDto[]) {
    this._trashedDesks = cases;
  }

  get trashedDesks(): DeskDto[] {
    return this._trashedDesks;
  }

  getMyTrashBin(): Observable<void> {
    return this._httpClient.get<Desk[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashBin`)
      .pipe(
        map((result: DeskDto[]) => {
          this._trashedDesks = result;
        })
      )
  }

  moveToTrashBin(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/moveToTrashBin`, {
      params: {
        id: id.toString(),
      }
    })
  }

  restoreFromTrashBin(id: number): Observable<void> {
    return this.httpClient.get<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/restoreFromTrashBin`, {
      params: {
        id: id.toString(),
      }
    })
  }

  removeFromTrashBin(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/removeFromTrashBin`, {
      params: {
        id: id.toString(),
      }
    })
  }
}
