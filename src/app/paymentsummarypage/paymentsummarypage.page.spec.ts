import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsummarypagePage } from './paymentsummarypage.page';

describe('PaymentsummarypagePage', () => {
  let component: PaymentsummarypagePage;
  let fixture: ComponentFixture<PaymentsummarypagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsummarypagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
