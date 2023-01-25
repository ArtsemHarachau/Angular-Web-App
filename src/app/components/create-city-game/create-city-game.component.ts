import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGame } from 'src/app/models/city-game';
import { CityGameService } from 'src/app/services/city-game.service';
import { NgForm } from '@angular/forms';

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
    this.cityGameService.createCityGame(this.cityGame).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
}
