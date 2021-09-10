import {BasicCRUD} from "../../../shared/services/basic-crud.service";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../../shared/services/account.service";


export abstract class CreatorService extends BasicCRUD<any> {

  protected constructor(
    protected postfix: string,
    protected httpClient: HttpClient,
    protected _accountService: AccountService
  ) {
    super(postfix, httpClient, _accountService);
  }
}
