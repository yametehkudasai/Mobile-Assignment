import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentsummarypage',
  templateUrl: './paymentsummarypage.page.html',
  styleUrls: ['./paymentsummarypage.page.scss'],
  standalone: false
})
export class PaymentsummarypagePage implements OnInit {

  constructor() { }

  public progress = 0.3333;

  ngOnInit() {
  }

  currentStep = 1;

  next() {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.progress += 0.5;

      if (this.currentStep === 3) {
        this.progress = 1;
      }
    }
  }

  prev() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.progress -= 0.3333;
    }
  }

  goTo(step: number) {
    this.currentStep = step;
  }

}
