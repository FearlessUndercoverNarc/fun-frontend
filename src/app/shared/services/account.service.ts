import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {ServiceInterface} from "../interfaces/service.interface";
import {ApiAreas} from "../enums/api-areas.enum";
import {LocalStorageEnum} from "../enums/local-storage.enum";
import {IsValidLoginRequestDto} from "../interfaces/is-valid-login-request-dto.interface";
import {IsValidLoginResponseDto} from "../interfaces/is-valid-login-response-dto.interface";
import {LoginRequestDto} from "../interfaces/login-request-dto.interface";
import {LoginResponseDto} from "../interfaces/login-response-dto.interface";
import {ApiControllers} from "../enums/api-controllers.enum";

//* AccountService is provided into AppModule
@Injectable({
  providedIn: 'root'
})
export class AccountService implements ServiceInterface {
  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
  }

  area = ApiAreas.Shared;
  controller = ApiControllers.Account;

  url = `${environment.apiUrl}/${this.area}/${this.controller}`

  private _token = '';

  get token(): string {
    if (!this._token) {
      this._token = localStorage.getItem(LocalStorageEnum.Token) || ''
    }
    return this._token
  }

  set token(token: string) {
    this._token = token
    localStorage.setItem(LocalStorageEnum.Token, this._token)
  }

  private _accountId = 0;

  get accountId(): number {
    if (!this._accountId) {
      this._accountId = ~~(localStorage.getItem(LocalStorageEnum.AccountId) ?? 0)
    }
    return this._accountId
  }

  set accountId(accountId: number) {
    this._accountId = accountId
    localStorage.setItem(LocalStorageEnum.AccountId, this._accountId.toString())
  }

  isLoginValid(request: IsValidLoginRequestDto): Observable<IsValidLoginResponseDto> {
    return this._httpClient.post<IsValidLoginResponseDto>(`${this.url}/isValidLogin`, request, {withCredentials: true})
  }

  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this._httpClient.post<LoginResponseDto>(`${this.url}/login`, request, {withCredentials: true})
      .pipe(
        map((response: LoginResponseDto) => {
          this.accountId = response.id
          this.token = response.token
          return response
        })
      )
  }

  logout(): void {
    this._httpClient.get(`${this.url}/logout`, {withCredentials: true})
      .subscribe(() => {
        this.killAuthorization()
        this._router.navigate(['/auth'])
      })
  }

  isLoggedIn(): boolean {
    return !!this.token
  }

  public killAuthorization(): void {
    this.killToken()
    this.killAccountId()
  }

  private killToken() {
    this.token = ''
  }

  private killAccountId() {
    this.accountId = 0;
  }

  authPageEntered() {
    if (this.isLoggedIn()) {
      this.killAuthorization();
    }
  }
}
