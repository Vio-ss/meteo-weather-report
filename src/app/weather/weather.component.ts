import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  location = { cityName: '', countryCode: '' };
  weather: any;

  constructor(private authservice : AuthService){
  }
  ngOnInit() {
    this.getWeather(this.location.cityName, this.location.countryCode);
  }
  getWeather(cityName: string, countryCode: string) {
    this.authservice
      .getWeather(cityName, countryCode)
      .subscribe(
        ( res: any) => {
          console.log(res);
          this.weather = res;
        },
        (err:any) => {
           console.log(err);
        }
      );
  }
  submitLocation(cityName: HTMLInputElement, countryCode: HTMLInputElement) {
    if (cityName.value && countryCode.value) {
      this.getWeather(cityName.value, countryCode.value);

      cityName.value = '';
      countryCode.value = '';
    } else {
      alert('Please. Insert Some Values');
    }
    cityName.focus();
    return false;
  }

}
