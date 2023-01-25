import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CityGame } from '../models/city-game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityGameService {
  private cityGameUrl: string;

  constructor(private httpClient: HttpClient) {
    this.cityGameUrl = 'http://localhost:8080/api/saveCityGame';
  }

  public createCityGame(cityGame: CityGame) {
    return this.httpClient.post<CityGame>(this.cityGameUrl, cityGame);
  }
}
