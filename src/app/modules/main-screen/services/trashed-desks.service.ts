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


  loadTrashedDesks(): Observable<void> {
    return this._httpClient.get<Desk[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashbin`)
      .pipe(
        map((result: DeskDto[]) => {
          this._trashedDesks = result;
        })
      )
  }


  moveToTrash(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/moveToTrashbin`, {
      params: {
        id: id.toString(),
      }
    })
  }

  recover(id: number): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/restoreFromTrashbin`, {
      params: {
        id: id.toString(),
      }
    })
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/removeFromTrashbin`, {
      params: {
        id: id.toString(),
      }
    })
  }
}
