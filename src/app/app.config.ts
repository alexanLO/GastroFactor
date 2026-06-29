import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from '../environments/environment';
import { ApiErrorInterceptor } from './core/interceptors/api-error.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      LoggerModule.forRoot({
        level: environment.production ? NgxLoggerLevel.WARN : NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.ERROR,
        serverLoggingUrl: '',
      }),
    ),

    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
