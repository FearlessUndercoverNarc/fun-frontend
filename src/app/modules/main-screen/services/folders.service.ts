import {Injectable, SkipSelf} from "@angular/core";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../shared/services/account.service";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FoldersService extends BasicCRUD<any> {
  private _folders: FolderDto[] = [];

  private _trashedFolders: FolderDto[] = [];

  constructor(
    private _httpClient: HttpClient,
    @SkipSelf() protected _accountService: AccountService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }

  set folders(cases: FolderDto[]) {
    this._folders = cases;
  }

  get folders(): FolderDto[] {
    return this._folders;
  }

  set trashedFolders(cases: FolderDto[]) {
    this._trashedFolders = cases;
  }

  get trashedFolders(): FolderDto[] {
    return this._trashedFolders;
  }

  loadSubFolders(folderId: number): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSubFoldersByFolder`, {
      params: {
        id: folderId
      }
    })
      .pipe(
        map((result: FolderDto[]) => {
          this._folders = result;
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

  loadTrashedFolders(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyTrashbin`)
      .pipe(
        map((result: FolderDto[]) => {
          this._folders = result;
        })
      )
  }
}
