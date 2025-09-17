import {HttpInterceptorFn} from '@angular/common/http';
import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {requestContext} from '../../request-context.service';
import {environment} from '../../../environment/enviroment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    const cookieService = inject(CookieService);
    token = cookieService.get('token');
  }

  if (isPlatformServer(platformId)) {
    const request = requestContext.get();

    if (request && request.cookies) {
      token = request.cookies['token'];
    }
  }

  let headers = req.headers;

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const noCacheUrl = `${environment.apiUrl}/event/get-event-active`;
  if (req.method === 'GET' && req.url === noCacheUrl) {
    headers = headers
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');
  }

  const clonedReq = req.clone({ headers });

  return next(clonedReq);
};
