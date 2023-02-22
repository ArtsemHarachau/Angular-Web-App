import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGame } from 'src/app/models/city-game';
import { CityGameService } from 'src/app/services/city-game.service';
import { NgForm } from '@angular/forms';
import { GameParticipant } from 'src/app/models/game-participant';
// import { parse, stringify, toJSON, fromJSON } from 'flatted';
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
import { Administrators } from 'src/app/models/administrators';

@Component({
  selector: 'app-create-city-game',
  templateUrl: './create-city-game.component.html',
  styleUrls: ['./create-city-game.component.css'],
})
export class CreateCityGameComponent {
  cityGame: CityGame;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService
  ) {
    this.cityGame = new CityGame();
  }

  onSubmit() {
    console.log(this.cityGame);
    this.saveCityGame();
  }

  saveCityGame() {
    this.cityGame.accessCode = 12345;
    // const { parse, stringify } = require('flatted');

    let gameParticipant = new Administrators();
    gameParticipant.idParticipant = 1;
    gameParticipant.nickname = 'Packman2000';
    gameParticipant.playingGames = [new CityGame()];

    // gameParticipant.playingGames?.push(this.cityGame);

    this.cityGame.playing?.push(gameParticipant);

    // gameParticipant.playingGames?.add(this.cityGame);

    // this.cityGame.playing?.add(gameParticipant);

    // const objectMapper = new ObjectMapper();

    // // objectMapper.stringify<GameParticipant>(gameParticipant);

    // const jsonData = objectMapper.stringify<CityGame>(this.cityGame);
    // console.log(jsonData);

    // const cityGameParsed = objectMapper.parse<CityGame>(jsonData, {
    //   mainCreator: () => [CityGame],
    // });
    // console.log(cityGameParsed);
    // stringify the object for upload to the database, using a replacer function to handle circular references
    // const jsonString = JSON.stringify(this.cityGame, (key, value) => {
    //   if (key !== 'playingGames' && value !== null) {
    //     return { circularReference: true };
    //   }
    //   return value;
    // });

    this.cityGameService.setCityGameObject(this.cityGame);

    this.cityGameService.createCityGame(this.cityGame).subscribe(
      (resp) => {
        // console.log(resp.body);
        // console.log(JSON.stringify(this.cityGame, null, 2));
        // console.log(this.cityGame);
        // if (resp.status == 200) {
        //   console.log(resp.body?.idGame);
        // }
      }
      // () => console.log(resp.body)
    );
  }
}
