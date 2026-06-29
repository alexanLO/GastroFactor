import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { MainScreen } from './main-screen';

const loggerStub = {
  debug: jasmine.createSpy('debug'),
  info: jasmine.createSpy('info'),
  warn: jasmine.createSpy('warn'),
  error: jasmine.createSpy('error')
};

describe('MainScreen', () => {
  let component: MainScreen;
  let fixture: ComponentFixture<MainScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainScreen],
      providers: [
        provideRouter([]),
        { provide: NGXLogger, useValue: loggerStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
