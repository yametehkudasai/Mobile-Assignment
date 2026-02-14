import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-weather-page',
  templateUrl: './check-weather-page.page.html',
  styleUrls: ['./check-weather-page.page.scss'],
  standalone: false
})
export class CheckWeatherPagePage implements OnInit {

  dataList: any;
  uniqueList: any;
  constructor(private router: Router, private api: Api) {
    this.api.getWeatherData().subscribe(
      (response) => {
        this.dataList = response;

        this.uniqueList = this.dataList.filter((item: any, index: number, self: any[]) =>
          index === self.findIndex((t: any) => t.location.location_name === item.location.location_name))

        console.log(this.uniqueList);
      },
      (error) => {
        console.log("API Call Failed");
      }
    )
  }

  ngOnInit() {
  }

  WeatherDetailsPage(locationName: string) {
    //alert(locationName);
    this.router.navigate(['/weather-detail-page', { LocationName: locationName }]);
  }
}
