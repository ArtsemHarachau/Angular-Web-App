import { CityGame } from './city-game';

export class PlaceInGame {
  orderId?: number;
  address?: string;
  latitudeCoord?: number;
  longitudeCoord?: number;
  legend?: string;
  photoLink?: string;

  cityGame?: CityGame;
}
