import { Component, Input, Renderer2 } from '@angular/core';
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
    // for (let i = 0; i < this.places.length; i++) {
    //   this.addNewPlace(
    //     this.places[i].orderId!,
    //     this.router,
    //     '/editplace',
    //     this.cityGameService,
    //     this.places
    //   );
    //   this.addPlainText(this.places[i].address!);
    //   this.addDeleteButton();
    // }
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.places.length; i++) {
      this.addNewPlace(
        this.places[i].orderId!,
        this.router,
        '/editplace',
        this.cityGameService,
        this.places
      );
      this.addPlainText(this.places[i].address!);
      this.addDeleteButton();
    }
  }

  onSubmit() {
    this.cityGameService
      .addAllPlacesToGame(this.places)
      .subscribe((resp) => {});
  }

  addNewPlace(
    orderID: number,
    router: Router,
    path: string,
    cityGameService: CityGameService,
    placesArray: PlaceInGame[]
  ) {
    console.log('Hej Hej Hej');

    let newPlaceButton = this.renderer.createElement('button');
    newPlaceButton.innerText = `Place ${orderID}`;
    newPlaceButton.setAttribute('class', 'icon-place-button');
    // newPlaceButton.click(this.router.navigateByUrl("/editplace"));
    newPlaceButton?.addEventListener('click', function handleClick() {
      // console.log('button clicked');
      // this.router.navigateByUrl("/editplace");
      router.navigateByUrl(path);
      cityGameService.setPlaceForUpdate(placesArray[orderID - 1]);
    });

    let parent = document.getElementById('places-track');

    if (!!document.getElementById('zero-places-span')) {
      this.renderer.removeChild(
        parent,
        document.getElementById('zero-places-span')
      );
    }

    this.renderer.appendChild(parent, newPlaceButton);
  }

  addPlainText(address: string) {
    let newPlainText = this.renderer.createElement('input');
    newPlainText.value = address;
    newPlainText.setAttribute('class', 'plain-text');
    let parent = document.getElementById('places-track');
    this.renderer.appendChild(parent, newPlainText);
  }

  addDeleteButton() {
    //location material icons
    let deleteButton = document.createElement('button');
    let deletePlace = document.createElement('span');
    deletePlace.className = 'material-icons';
    deletePlace.innerHTML = '&#xe872;';
    deleteButton.appendChild(deletePlace);
    let parent = document.getElementById('places-track');
    parent?.appendChild(deleteButton);
  }
}
