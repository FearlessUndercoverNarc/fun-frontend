import {Injectable} from "@angular/core";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {AccountService} from "../../../shared/services/account.service";
import {HttpClient} from "@angular/common/http";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FolderTrashBinService extends BasicCRUD<any> {
  private _trashedFolders: FolderDto[] = [];

  constructor(
    protected _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.FolderTrashbin, _httpClient, _accountService);
  }

  set trashedFolders(cases: FolderDto[]) {
    this._trashedFolders = cases;
  }

  get trashedFolders(): FolderDto[] {
    return this._trashedFolders;
  }

  getMyTrashBin(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashBin`)
      .pipe(
        map((result: FolderDto[]) => {
          this._trashedFolders = result;
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
