import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';

import { LoginPageComponent } from './login-page.component';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error')
};

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [{ provide: NGXLogger, useValue: loggerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
