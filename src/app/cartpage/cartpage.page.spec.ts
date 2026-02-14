import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartpagePage } from './cartpage.page';

describe('CartpagePage', () => {
  let component: CartpagePage;
  let fixture: ComponentFixture<CartpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
