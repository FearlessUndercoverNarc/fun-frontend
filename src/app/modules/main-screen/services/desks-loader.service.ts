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

@Injectable({
  providedIn: 'root'
})
export class DesksLoaderService extends BasicCRUD<any> {
  get desksShared(): DeskDto[] {
    return this._desksShared;
  }

  set desksShared(value: DeskDto[]) {
    this._desksShared = value;
  }

  private _desks: DeskDto[] = [];
  private _desksShared: DeskDto[] = [];

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

  loadDesksInFolder(folderId: number): Observable<void> {
    return this.getByFolder(folderId)
      .pipe(
        map((result: DeskDto[]) => {
          this._desks = result;
        })
      )
  }

  loadDesksInCurrentFolder(): Observable<void> {
    return this.getByFolder(this._pathService.parentFolderId)
      .pipe(
        map((result: DeskDto[]) => {
          this._desks = result;
        })
      )
  }

  getByFolder(id: number): Observable<DeskDto[]> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this._accountService.ApiVersion}/${this.postfix}/getByFolder`, {
      params: {
        id: id.toString()
      }
    });
  }

  loadSharedDesksInFolder(id: number): Observable<void> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this._accountService.ApiVersion}/${this.postfix}/getByFolder`, {
      params: {
        id: id
      }
    })
      .pipe(
        map((result: DeskDto[]) => {
          this._desksShared = result;
        })
      )
  }

  moveToTrashBin(id: number) {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/moveToTrashBin`, {
      params: {
        id: id.toString(),
      }
    })
  }

  getMyTrashBin(): Observable<void> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashBin`)
      .pipe(
        map((result: DeskDto[]) => {
          this._desks = result;
        })
      )
  }

  getSharedToMe(): Observable<void> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSharedToMe`)
      .pipe(
        map((result: DeskDto[]) => {
          console.table(result);
          this._desksShared = result;
        })
      )
  }

  moveToFolder(id: number, destinationId: number): Observable<void> {
    return this._httpClient.get<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/moveToFolder`, {
      params: {
        id: id,
        destinationId: destinationId
      }
    });
  }
}
