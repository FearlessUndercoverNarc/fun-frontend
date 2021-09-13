import {HttpClient} from "@angular/common/http";
import {Injectable, NgZone} from "@angular/core";
import {APIControllers} from "../enums/api-controllers.enum";
import {Desk} from "../interfaces/desk.interface";
import {BasicCRUD} from "./basic-crud.service";
import {AccountService} from "./account.service";
import {environment} from "src/environments/environment";
import {Observable, Subject} from "rxjs";
import {ImportService} from "src/app/modules/main-screen/services/import.service";
import {PathService} from "src/app/modules/main-screen/services/path.service";
import CreatedDto from "../interfaces/dto/created-dto.interface";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DeskService extends BasicCRUD<Desk> {

  eventSource = {} as EventSource
  lastSelectedDeskId: number = 0;
  isDeskSelected: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    protected _accountService: AccountService,
    private _ngZone: NgZone,
    private _importService: ImportService,
    private _pathService: PathService
  ) {
    super(APIControllers.Desk, _httpClient, _accountService);
  }

  onDeskUpdate$: Subject<any> = new Subject<any>()


  createSSEConnection(id: number) {
    this.eventSource = new EventSource(`${environment.apiUrl}/v1/DeskAction/sse?id=${id}`)

    console.log(this.eventSource)

    this.eventSource.onmessage = (message) => {
      this._ngZone.run(() => {
        this.onDeskUpdate$.next()
      })
    }
  }

  closeSSEConnection() {
    if (!this.eventSource) return;
    this.eventSource.close()
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

  import(): Observable<CreatedDto> {
    const form: FormData = new FormData()
    form.append('file', this._importService.folderImportFile)
    if (this._pathService.parentFolderId) form.append('parentId', this._pathService.parentFolderId + '');

    return this._httpClient.post<CreatedDto>(`${environment.apiUrl}/${this.apiArea}/${this.postfix}/import`, form)
  }

}
