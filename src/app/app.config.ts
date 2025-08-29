import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {credentialsInterceptor} from './core/interceptors/credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
      ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    CookieService
  ]
};
