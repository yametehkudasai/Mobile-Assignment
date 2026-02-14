import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = "https://api.data.gov.my/weather/forecast";

  constructor(private http: HttpClient) {}

  getWeatherData() : Observable<any> {
    return this.http.get(this.baseUrl);
  }
}


