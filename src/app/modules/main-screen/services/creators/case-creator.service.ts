import {Injectable} from "@angular/core";
import {CreatorService} from "./creator.service";
import {HttpClient} from "@angular/common/http";
import {ApiAreas} from "../../../../shared/enums/api-areas.enum";
import {APIControllers} from "../../../../shared/enums/api-controllers.enum";
import {AccountService} from "../../../../shared/services/account.service";

@Injectable({
  providedIn: 'root'
})
export class CaseCreatorService extends CreatorService {

  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.Folder, _httpClient, _accountService);
  }
}
