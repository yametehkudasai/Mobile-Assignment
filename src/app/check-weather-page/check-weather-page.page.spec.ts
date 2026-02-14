import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckWeatherPagePage } from './check-weather-page.page';

describe('CheckWeatherPagePage', () => {
  let component: CheckWeatherPagePage;
  let fixture: ComponentFixture<CheckWeatherPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckWeatherPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
