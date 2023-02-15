import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CityGame } from '../models/city-game';
import { Observable } from 'rxjs';
import {
  JsonProperty,
  JsonClassType,
  JsonIdentityInfo,
  ObjectIdGenerator,
  JsonIgnoreProperties,
  JsonManagedReference,
  ObjectMapper,
  JsonIgnore,
} from 'jackson-js';

@Injectable({
  providedIn: 'root',
})
export class CityGameService {
  private cityGameUrl: string;

  constructor(private httpClient: HttpClient) {
    this.cityGameUrl = 'http://localhost:8080/api/savegame';
  }

  public createCityGame(cityGame: CityGame): Observable<HttpResponse<String>> {
    const objectMapper = new ObjectMapper();

    // objectMapper.stringify<GameParticipant>(gameParticipant);

    const jsonData = objectMapper.stringify<CityGame>(cityGame);
    console.log(jsonData);

    // return this.httpClient.post<CityGame>(this.cityGameUrl, cityGame, {
    //   observe: 'response',
    // });
    return this.httpClient.post<String>(this.cityGameUrl, jsonData, {
      observe: 'response',
    });
  }
}
