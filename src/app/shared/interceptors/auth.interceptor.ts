import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountService } from "../services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _accountService: AccountService,
    private _router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._accountService.isLoggedIn()) {
      req = req.clone({
        setHeaders: {
          'auth-token': this._accountService.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          if (error.status == 401) {
            // this._accountService.logout()
            this._accountService.killAuthorization()
            this._router.navigate(['/auth'])
          }
          return throwError(error)
        })
      )
  }

}
