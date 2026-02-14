import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDetailPagePage } from './weather-detail-page.page';

describe('WeatherDetailPagePage', () => {
  let component: WeatherDetailPagePage;
  let fixture: ComponentFixture<WeatherDetailPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
