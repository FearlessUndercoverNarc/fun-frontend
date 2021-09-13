import {Injectable} from "@angular/core";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {HttpClient} from "@angular/common/http";
import {ApiAreas} from "../../../shared/enums/api-areas.enum";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {Observable} from "rxjs";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {AccountService} from "../../../shared/services/account.service";

@Injectable({
  providedIn: 'root'
})
export class CasesService extends BasicCRUD<any> {
  get sharedToMeRoot(): FolderDto[] {
    return this._sharedToMeRoot;
  }

  set sharedToMeRoot(value: FolderDto[]) {
    this._sharedToMeRoot = value;
  }

  private _myRoot: FolderDto[] = [];
  private _sharedToMeRoot: FolderDto[] = [];


  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }

  set myRoot(value: FolderDto[]) {
    this._myRoot = value;
  }

  get myRoot(): FolderDto[] {
    return this._myRoot;
  }

  getMyRoot(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyRoot`)
      .pipe(
        map((result: FolderDto[]) => {
          this._myRoot = result;
        })
      )
  }

  getSharedToMeRoot(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSharedToMeRoot`)
      .pipe(
        map((result: FolderDto[]) => {
          this._sharedToMeRoot = result;
        })
      )
  }
}
