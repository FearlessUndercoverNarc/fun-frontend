import {Injectable} from "@angular/core";
import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../shared/services/account.service";
import {APIControllers} from "../../../shared/enums/api-controllers.enum";
import {environment} from "../../../../environments/environment";
import {FolderDto} from "../interfaces/dto/folder-dto.interface";
import {DeskDto} from "../interfaces/dto/desk-dto.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareCasesService extends BasicCRUD<any> {

  constructor(
    protected _httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(APIControllers.FolderShare, _httpClient, _accountService);
  }

  share(id: number, recipientId: number, hasWriteAccess: boolean) {

    return this.httpClient.get<void>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/share`, {
      params: {
        id: id.toString(),
        recipientId: recipientId.toString(),
        hasWriteAccess: hasWriteAccess ? 'true' : 'false'
      }
    })

  }
}

