
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { AuthGuard } from './views/home/account/shared/auth/auth.guard';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    

    // Clone the request to add the new header.
    const authReq = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${this.loginService.Token()}`
        Authorization: `Bearer ${sessionStorage.getItem('token-access')}`
    }
    });
    

    //send the newly created request
    return next.handle(authReq).catch((error, caught) => {
      //intercept the respons error and displace it to the console
      console.log('Ocorreu um erro');
      console.log(error);
      //return the error to the method that called it
      return Observable.throw(error);
    }) as any;
  }
}