import { GameParticipant } from './game-participant';
import {
  JsonProperty,
  JsonClassType,
  JsonIdentityInfo,
  ObjectIdGenerator,
  JsonIgnoreProperties,
  JsonManagedReference,
  JsonIgnore,
} from 'jackson-js';
import { Administrators } from './administrators';

export class CityGame {
  @JsonProperty()
  @JsonClassType({ type: () => [Number] })
  idGame?: number;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  nameOfGame?: string;

  @JsonProperty()
  @JsonClassType({ type: () => [Number] })
  accessCode?: number;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  cityForGame?: string;

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  dateForStartGame?: string;
  /*dateForEndGame?: string;*/

  @JsonProperty()
  @JsonClassType({ type: () => [String] })
  countryForGame?: string;
  // playing?: Set<GameParticipant> = new Set<GameParticipant>([]);

  @JsonProperty()
  @JsonClassType({ type: () => [Array, [Administrators]] })
  @JsonManagedReference()
  playing?: Array<GameParticipant> = [];
}
