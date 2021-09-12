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
  get lastSelectedFolderId(): number {
    if (!this._lastSelectedFolderId) {
      this._lastSelectedFolderId = ~~(localStorage.getItem('lastSelectedFolderId') + '');
    }
    return this._lastSelectedFolderId;
  }

  set lastSelectedFolderId(value: number) {
    this._lastSelectedFolderId = value;
    localStorage.setItem('lastSelectedFolderId', value.toString());
  }

  get foldersShared(): FolderDto[] {
    return this._foldersShared;
  }

  set foldersShared(value: FolderDto[]) {
    this._foldersShared = value;
  }

  private _folders: FolderDto[] = [];
  private _foldersShared: FolderDto[] = [];

  private _lastSelectedFolderId: number = 0;


  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }

  set folders(cases: FolderDto[]) {
    this._folders = cases;
  }

  get folders(): FolderDto[] {
    return this._folders;
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

  loadSharedSubFolders(folderId: number): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSubFoldersByFolder`, {
      params: {
        id: folderId
      }
    })
      .pipe(
        map((result: FolderDto[]) => {
          this._foldersShared = result;
        })
      )
  }

  loadSharedToMeFolders(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSharedToMeRoot`)
      .pipe(
        map((result: FolderDto[]) => {
          this._foldersShared = result;
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
