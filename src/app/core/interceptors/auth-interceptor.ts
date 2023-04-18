import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  urlsToNotUse: Array<string>;

  constructor(
    // private jwtService: JwtTokenService,
    private authStorageService: LocalStorageService
  ) {
    this.urlsToNotUse= [
      'auth/authenticate',
      'auth/register',
    ];
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    if (this.isValidRequestForInterceptor(request.url)) {
      const token = this.authStorageService.get('token') ? this.authStorageService.get('token') : '';
      request = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token
        },
      });
    }
    return next.handle(request);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = 'api/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position != -1) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
