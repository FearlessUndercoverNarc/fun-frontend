import {Injectable} from "@angular/core";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../shared/services/account.service";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {ImportService} from "./import.service";
import {PathService} from "./path.service";

@Injectable({
  providedIn: 'root'
})
export class FoldersService extends BasicCRUD<any> {
  isFolderSelected: boolean = true;

  get lastSelectedFolderId(): number {
    // if (!this._lastSelectedFolderId) {
    //   this._lastSelectedFolderId = ~~(localStorage.getItem('lastSelectedFolderId') + '');
    // }
    return this._lastSelectedFolderId;
  }

  set lastSelectedFolderId(value: number) {
    this._lastSelectedFolderId = value;
    // localStorage.setItem('lastSelectedFolderId', value.toString());
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
    protected _accountService: AccountService,
    private _importService: ImportService,
    private _pathService: PathService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }

  set folders(cases: FolderDto[]) {
    this._folders = cases;
  }

  get folders(): FolderDto[] {
    return this._folders;
  }

  getSubFoldersByFolder(id: number): Observable<FolderDto[]> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSubFoldersByFolder`, {
      params: {
        id: id
      }
    })
  }

  loadSubFolders(folderId: number): Observable<void> {
    return this.getSubFoldersByFolder(folderId)
      .pipe(
        map((result: FolderDto[]) => {
          this._folders = result;
        })
      )
  }

  loadSharedSubFolders(folderId: number): Observable<void> {
    return this.getSubFoldersByFolder(folderId)
      .pipe(
        map((result: FolderDto[]) => {
          this._foldersShared = result;
        })
      )
  }

  getSharedToMeRoot(): Observable<void> {
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

  export(id: number): Observable<ArrayBuffer> {
    return this._httpClient.get(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/export`, {
      params: {id: id + ''},
      observe: 'response',
      responseType: 'arraybuffer'
    }).pipe(
      map((response) => {
        return response.body!
      })
    )
  }

  import(): Observable<any> {
    const form: FormData = new FormData()
    form.append('file', this._importService.folderImportFile)
    if (this._pathService.parentFolderId) form.append('parentId', this._pathService.parentFolderId + '');

    return this._httpClient.post<any>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/import`, form)
  }
}
