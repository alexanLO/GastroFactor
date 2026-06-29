import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private readonly accessTokenKey = 'access_token';

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isPublicAuthRequest(req.url)) {
      return next.handle(req);
    }

    const token = this.getStoredItem(this.accessTokenKey);

    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReq);
  }

  private isPublicAuthRequest(url: string): boolean {
    return (
      url.includes('/v1/auth/login')
      || url.includes('/v1/auth/register')
      || url.includes('/v1/auth/refresh/')
    );
  }

  private getStoredItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
    } catch {
      return null;
    }

    return null;
  }
}