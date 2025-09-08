import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  Provider,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {credentialsInterceptor} from './core/interceptors/credentials.interceptor';
import {IMAGE_LOADER, ImageLoaderConfig} from '@angular/common';

const customImageLoader = (config: ImageLoaderConfig) => {
  if (config.src.startsWith('assets/')) {
    return `/${config.src}`;
  }
  const cloudinaryUrl = 'https://res.cloudinary.com/dytzru3ad/image/upload/';
  const params = `w_${config.width},q_auto,f_auto`;
  return `${cloudinaryUrl}${params}/${config.src}`;
};

export const customImageLoaderProvider: Provider = {
  provide: IMAGE_LOADER,
  useValue: customImageLoader,
};

export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
      ])
    ),
    customImageLoaderProvider,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideClientHydration(withEventReplay()),
    CookieService
  ]
};
