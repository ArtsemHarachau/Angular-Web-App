import { CityGame } from './city-game';
import {
  JsonProperty,
  JsonClassType,
  JsonIdentityInfo,
  ObjectIdGenerator,
  JsonIgnoreProperties,
  JsonManagedReference,
  JsonIgnore,
  JsonBackReference,
} from 'jackson-js';

export abstract class GameParticipant {
  @JsonProperty()
  @JsonClassType({ type: () => [Number] })
  idParticipant?: number;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  nickname?: string;

  // playingGames?: Set<CityGame> = new Set<CityGame>();

  @JsonProperty()
  @JsonClassType({ type: () => [Array, [CityGame]] })
  @JsonBackReference()
  playingGames?: Array<CityGame> = [];
}
