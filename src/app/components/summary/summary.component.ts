import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { PlaceInGame } from 'src/app/models/place-in-game';
import { CityGameService } from 'src/app/services/city-game.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  places: PlaceInGame[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.places = this.cityGameService.getGamePlacesArray();
    console.log(this.places);
  }

  onSubmit() {
    this.cityGameService
      .addAllPlacesToGame(this.places)
      .subscribe((resp) => {});
  }
}
