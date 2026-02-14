import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductdetailpagePage } from './productdetailpage.page';

describe('ProductdetailpagePage', () => {
  let component: ProductdetailpagePage;
  let fixture: ComponentFixture<ProductdetailpagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdetailpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
