import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthResponse, LoginRequest } from '../../../shared/models/auth.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const navigateSpy = jasmine.createSpy('navigate').and.resolveTo(true);

  const loggerStub = {
    debug: jasmine.createSpy('debug'),
    info: jasmine.createSpy('info'),
    warn: jasmine.createSpy('warn'),
    error: jasmine.createSpy('error')
  };

  function createJwtWithExp(exp: number): string {
    const header = { alg: 'none', typ: 'JWT' };
    const payload = { exp };

    const toBase64Url = (value: unknown): string =>
      window
        .btoa(JSON.stringify(value))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');

    return `${toBase64Url(header)}.${toBase64Url(payload)}.signature`;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: { navigate: navigateSpy } },
        { provide: NGXLogger, useValue: loggerStub }
      ]
    });

    localStorage.clear();
    navigateSpy.calls.reset();

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login, persist tokens and navigate to collection', () => {
    const request: LoginRequest = {
      email: 'usuario@gastrofactor.com',
      password: '123456'
    };

    const response: AuthResponse = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    };

    let result: AuthResponse | undefined;
    service.userLogin(request).subscribe((authResponse) => {
      result = authResponse;
    });

    const req = httpMock.expectOne('/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(response);

    expect(result).toEqual(response);
    expect(localStorage.getItem('access_token')).toBe('access-token');
    expect(localStorage.getItem('refresh_token')).toBe('refresh-token');
    expect(navigateSpy).toHaveBeenCalledWith(['/meu-acervo']);
  });

  it('should logout, clear tokens and navigate to home', () => {
    localStorage.setItem('access_token', 'to-be-removed');
    localStorage.setItem('refresh_token', 'to-be-removed');

    service.userLogout();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith(['/gastrofactor']);
  });

  it('should return false and clear tokens when JWT is expired', () => {
    const expiredToken = createJwtWithExp(Math.floor(Date.now() / 1000) - 60);

    localStorage.setItem('access_token', expiredToken);
    localStorage.setItem('refresh_token', 'refresh-token');

    const authenticated = service.isAuthenticated();

    expect(authenticated).toBeFalse();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
  });

  it('should return true when JWT is valid', () => {
    const validToken = createJwtWithExp(Math.floor(Date.now() / 1000) + 3600);
    localStorage.setItem('access_token', validToken);

    const authenticated = service.isAuthenticated();

    expect(authenticated).toBeTrue();
  });
});
