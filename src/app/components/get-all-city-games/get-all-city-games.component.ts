import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGameService } from 'src/app/services/city-game.service';

@Component({
  selector: 'app-get-all-city-games',
  templateUrl: './get-all-city-games.component.html',
  styleUrls: ['./get-all-city-games.component.css'],
})
export class GetAllCityGamesComponent {
  private jsonArray: Array<any> = new Array<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService
  ) {}

  ngOnInit() {
    this.setJsonArray();
  }

  onSubmit() {
    if (!!this.jsonArray) {
      console.log(this.jsonArray);
    }
  }

  private setJsonArray() {
    this.cityGameService.getAllCityGames().subscribe((response) => {
      this.jsonArray = response;
    });
  }
}
