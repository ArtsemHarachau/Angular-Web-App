import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CityGame } from '../models/city-game';
import { Observable, BehaviorSubject } from 'rxjs';
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
import { PlaceInGame } from '../models/place-in-game';
import { JsonFormatArray } from 'jackson-js/dist/@types';

@Injectable({
  providedIn: 'root',
})
export class CityGameService {
  private cityGameUrl: string;

  private cityGameObject = new BehaviorSubject<CityGame>({});

  private gamePlacesArray = new BehaviorSubject<PlaceInGame[]>([]);

  private placeForUpdate = new BehaviorSubject<PlaceInGame>({});

  private mapsMarkersArray = new BehaviorSubject<google.maps.Marker[]>([]);
  // createdCityGameObject = this.cityGameObject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.cityGameUrl = 'http://localhost:8080/api';
  }

  setCityGameObject(cityGame: CityGame) {
    let newCityGame = new CityGame(
      cityGame.idGame,
      cityGame.nameOfGame,
      cityGame.accessCode,
      cityGame.cityForGame,
      cityGame.dateForStartGame,
      cityGame.countryForGame
    );

    this.cityGameObject.next(newCityGame);
  }

  getCityGameObject(): CityGame {
    return this.cityGameObject.getValue();
  }

  setGamePlacesArray(placesArray: PlaceInGame[]) {
    this.gamePlacesArray.next(placesArray);
  }

  getGamePlacesArray(): PlaceInGame[] {
    return this.gamePlacesArray.getValue();
  }

  setPlaceForUpdate(place: PlaceInGame) {
    this.placeForUpdate.next(place);
  }

  getPlaceForUpdate(): PlaceInGame {
    return this.placeForUpdate.getValue();
  }

  setMapsMarkersArray(markers: google.maps.Marker[]) {
    this.mapsMarkersArray.next(markers);
  }

  getMapsMarkersArray(): google.maps.Marker[] {
    return this.mapsMarkersArray.getValue();
  }

  public createCityGame(cityGame: CityGame): Observable<HttpResponse<String>> {
    const objectMapper = new ObjectMapper();

    // objectMapper.stringify<GameParticipant>(gameParticipant);

    const jsonData = objectMapper.stringify<CityGame>(cityGame);
    console.log(jsonData);

    // return this.httpClient.post<CityGame>(this.cityGameUrl, cityGame, {
    //   observe: 'response',
    // });
    return this.httpClient.post<String>(
      this.cityGameUrl + '/savegame',
      jsonData,
      {
        observe: 'response',
      }
    );
  }

  public addNewPlaceToGame(
    place: PlaceInGame
  ): Observable<HttpResponse<String>> {
    const objectMapper = new ObjectMapper();

    const jsonData = objectMapper.stringify<PlaceInGame>(place);
    console.log(jsonData);

    return this.httpClient.post<String>(
      this.cityGameUrl + '/addplacetogame',
      jsonData,
      { observe: 'response' }
    );
  }

  public addAllPlacesToGame(
    places: PlaceInGame[]
  ): Observable<HttpResponse<String>> {
    console.log('Hej service');
    const objectMapper = new ObjectMapper();

    const jsonData = objectMapper.stringify<PlaceInGame[]>(places);
    console.log(jsonData);

    return this.httpClient.post<String>(
      this.cityGameUrl + '/addallplaces',
      jsonData,
      { observe: 'response' }
    );
  }

  public getAllCityGames(): Observable<any> {
    return this.httpClient.get(this.cityGameUrl + '/only/allcitygames');
  }
}
