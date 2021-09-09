import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {LoginDto} from "../interfaces/dto/login-dto.interface";
import {APIControllers} from "../enums/api-controllers.enum";
import {UserDto} from "../interfaces/dto/user-dto.interface";
import {BasicCRUD} from "./basic-crud.service";
import LoginResultDto from "../interfaces/dto/login-result-dto.interface";
import {ApiAreas} from "../enums/api-areas.enum";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BasicCRUD<any> {
  postfix: string;
  private _token = '';
  private _id = 0;

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) {
    super(ApiAreas.Shared, APIControllers.Account, _httpClient);
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
          return result;
        })
      );
  }

  update(element: UserDto): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/${ApiAreas.Shared}/${this.postfix}/UpdateAccount`, element)
  }


  // getById(id: number): Observable<UserDto> {
  //   return this._httpClient.get<UserDto>(`${environment.apiUrl}/${this.postfix}/GetById`, {
  //     params: {
  //       id: id.toString()
  //     }
  //   })
  // }

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
}
