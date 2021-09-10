import {Injectable} from "@angular/core";
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
export class FoldersService extends BasicCRUD<any>{
  private _folder: FolderDto[] = [];

  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }

  set folders(cases: FolderDto[]) {
    this._folder = cases;
  }

  get folders(): FolderDto[] {
    return this._folder;
  }

  loadSubFolders(folderId: number): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getSubFoldersByFolder`, {
      params: {
        id: folderId
      }
    })
      .pipe(
        map((result: FolderDto[]) => {
          this._folder = result;
        })
      )
  }
}
