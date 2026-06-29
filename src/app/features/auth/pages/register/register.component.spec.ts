import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';

import { RegisterComponent } from './register.component';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error')
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [{ provide: NGXLogger, useValue: loggerStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
