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

  private _cases: FolderDto[] = [];

  private _selectedCaseId = 0;

  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }

  set selectedCaseId(id: number) {
    this._selectedCaseId = id;
  }

  get selectedCaseId(): number {
    return this._selectedCaseId;
  }

  set cases(cases: FolderDto[]) {
    this._cases = cases;
  }

  get cases(): FolderDto[] {
    return this._cases;
  }

  loadCases(): Observable<void> {
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/getMyRoot`)
      .pipe(
        map((result: FolderDto[]) => {
          this._cases = result;
        })
      )
  }

}
