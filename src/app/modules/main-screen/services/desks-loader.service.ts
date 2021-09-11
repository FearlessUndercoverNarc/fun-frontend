import {Injectable} from "@angular/core";
import {DeskDto} from "../interfaces/dto/desk-dto.interface";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../shared/services/account.service";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {PathService} from "./path.service";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {Desk} from "../../../shared/interfaces/desk.interface";

@Injectable({
  providedIn: 'root'
})
export class DesksLoaderService extends BasicCRUD<any> {
  private _desks: DeskDto[] = [];

  // private postfix = APIControllers.Desk

  constructor(
    protected _httpClient: HttpClient,
    protected _accountService: AccountService,
    private _pathService: PathService
  ) {
    super(APIControllers.Desk, _httpClient, _accountService)
  }

  set desks(desks: DeskDto[]) {
    this._desks = desks;
  }

  get desks(): DeskDto[] {
    return this._desks;
  }

  loadDesks(): Observable<void> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this._accountService.ApiVersion}/${this.postfix}/getByFolder`, {
      params: {
        id: this._pathService.parentFolderId
      }
    })
      .pipe(
        map((result: DeskDto[]) => {
          this._desks = result;
        })
      )
  }

  moveToTrash(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/moveToTrashbin`, {
      params: {
        id: id.toString(),
      }
    })
  }

  loadTrashedDesks(): Observable<void> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashbin`)
      .pipe(
        map((result: DeskDto[]) => {
          this._desks = result;
        })
      )
  }
}
