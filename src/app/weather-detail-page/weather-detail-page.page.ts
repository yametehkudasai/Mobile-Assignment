import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-weather-detail-page',
  templateUrl: './weather-detail-page.page.html',
  styleUrls: ['./weather-detail-page.page.scss'],
  standalone: false
})
export class WeatherDetailPagePage implements OnInit {

  LocationName: any;
  FilterList: any;
  constructor(private ActivatedRoute: ActivatedRoute, private api: Api) {
    this.ActivatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.LocationName = params.get('LocationName');

      alert(this.LocationName);
    });

    this.api.getWeatherData().subscribe(
      (response) => {
        this.FilterList = response.filter((item: any) => item.location.location_name === this.LocationName);
        console.log(this.FilterList);
      },
      (error) => {
        console.log("API Call Failed");
      }
    )
  }

  ngOnInit() {
  }

}
