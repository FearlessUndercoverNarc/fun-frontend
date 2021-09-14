import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {LoginDto} from "../interfaces/dto/login-dto.interface";
import {APIControllers} from "../enums/api-controllers.enum";
import {UserDto} from "../interfaces/dto/user-dto.interface";
import LoginResultDto from "../interfaces/dto/login-result-dto.interface";
import {ApiAreas} from "../enums/api-areas.enum";
import {IsActiveDto} from "../interfaces/dto/is-active-dto.interface";
import CreatedDto from "../interfaces/dto/created-dto.interface";
import {AccountDto, UpdateAccountDto} from "../interfaces/account-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  postfix: string;
  private _token = '';
  private _id = 0;
  private _hasSubscription = false;

  //TODO when subs made update it in LS
  // lastSelectedFolderId: number = 0;

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) {
    this.postfix = APIControllers.Account;
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem('token', this._token);
  }

  get token(): string {
    if (!this._token) {
      this._token = localStorage.getItem('token') + '';
    }
    return this._token;
  }

  set hasSubscription(hasSubscription: boolean) {
    this._hasSubscription = hasSubscription;
    localStorage.setItem('hasSubscription', this._hasSubscription ? 'yes' : 'no');
  }

  get hasSubscription(): boolean {
    if (!this._hasSubscription) {
      this._hasSubscription = localStorage.getItem('hasSubscription') === 'yes';
    }
    return this._hasSubscription;
  }

  get id(): number {
    if (!this._id) {
      this._id = +(localStorage.getItem('id') + '');
    }
    return this._id
  }

  set id(newId) {
    this._id = newId
    localStorage.setItem('id', this._id + '')
  }


  login(loginData: LoginDto): Observable<LoginResultDto> {
    return this._httpClient.post<LoginResultDto>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/login`, loginData, {withCredentials: true})
      .pipe(
        map((result: LoginResultDto) => {
          this.id = result.id
          this.token = result.token;
          this.hasSubscription = result.hasSubscription
          return result;
        })
      );
  }

  toggleSubscription(): Observable<IsActiveDto> {
    return this._httpClient.get<IsActiveDto>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/ToggleSubscription`, {withCredentials: true})
  }

  update(user: UpdateAccountDto): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/Update`, user)
  }

  getAll(): Observable<UserDto[]> {
    return this._httpClient.get<UserDto[]>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/GetAll`)
  }

  logoutAndNavigateToAuth(): void {
    this.killLocalStorage();
    this._httpClient.get(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/logout`);
    this.router.navigate(['auth']);
  }

  isLoggedIn(): boolean {
    return (
      !!this._token ||
      !!localStorage.getItem('token'))
      &&
      (!!this._id ||
        !!localStorage.getItem('id')
      );
  }

  killLocalStorage() {
    this.killToken();
    this.killAccountId();
  }

  killToken(): void {
    this.token = '';
  }

  killAccountId(): void {
    this.id = 0;
  }


  authPageEntered() {
    if (this.isLoggedIn()) this.killLocalStorage();
  }

  create(data: any): Observable<CreatedDto> {
    return this._httpClient.post<CreatedDto>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/Create`, data)
  }

  get ApiVersion(): string {
    return this.hasSubscription ? ApiAreas.v2 : ApiAreas.v1;
  }

  getMy(): Observable<AccountDto> {
    return this._httpClient.get<AccountDto>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/GetMy`)
  }
}
