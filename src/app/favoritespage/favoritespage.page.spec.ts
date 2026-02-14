import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritespagePage } from './favoritespage.page';

describe('FavoritespagePage', () => {
  let component: FavoritespagePage;
  let fixture: ComponentFixture<FavoritespagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritespagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
