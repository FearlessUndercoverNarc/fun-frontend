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
export class TrashedFoldersService extends BasicCRUD<any> {
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


  loadTrashedFolders(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashbin`)
      .pipe(
        map((result: FolderDto[]) => {
          this._trashedFolders = result;
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

  recover(id: number) {
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
