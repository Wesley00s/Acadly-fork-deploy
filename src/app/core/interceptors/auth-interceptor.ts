import {HttpInterceptorFn} from '@angular/common/http';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {requestContext} from '../../request-context.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    const cookieService = inject(CookieService);
    token = cookieService.get('token');

    if (isPlatformServer(platformId)) {
      const request = requestContext.get();

      if (request && request.cookies) {
        token = request.cookies['token'];
      }
    }
  }

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(clonedReq);
  }

  return next(req);
};
