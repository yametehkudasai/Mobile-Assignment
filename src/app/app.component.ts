import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle'; //1

register(); //2
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() { }
}
