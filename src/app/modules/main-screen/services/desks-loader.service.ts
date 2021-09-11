import {Injectable} from "@angular/core";
import {DeskDto} from "../interfaces/dto/desk-dto.interface";
import {Observable} from "rxjs";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../shared/services/account.service";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {PathService} from "./path.service";

@Injectable({
  providedIn: 'root'
})
export class DesksLoaderService {
  private _desks: DeskDto[] = [];

  private postfix = APIControllers.Desk

  constructor(
    private _httpClient: HttpClient,
    private _accountService: AccountService,
    private _pathService: PathService
  ) {
  }

  set desks(desks: DeskDto[]) {
    this._desks = desks;
  }

  get desks(): DeskDto[] {
    return this._desks;
  }

  loadDesks(): Observable<void> {
    return this._httpClient.get<DeskDto[]>(`${environment.apiUrl}/${this._accountService.ApiVersion}/${this.postfix}/getByFolder`, {
      params: {
        id: this._pathService.parentFolderId
      }
    })
      .pipe(
        map((result: DeskDto[]) => {
          this._desks = result;
        })
      )
  }

}
