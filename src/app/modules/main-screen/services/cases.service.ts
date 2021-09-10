import {Injectable} from "@angular/core";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiAreas} from "../../../shared/enums/api-areas.enum";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {Observable} from "rxjs";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CasesService extends BasicCRUD<any> {

  postfix: string;
  area: string;

  private _cases: FolderDto[] = [];

  private _selectedCaseId = 0;

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) {
    super(ApiAreas.v1, APIControllers.Folder, _httpClient);
    this.postfix = APIControllers.Folder;
    this.area = ApiAreas.v1;
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
    return this._httpClient.get<FolderDto[]>(`${environment.apiUrl}/${this.area}/${this.postfix}/getMyRoot`)
      .pipe(
        map((result: FolderDto[]) => {
          this._cases = result;
        })
      )
  }

}
