import { Component, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGameService } from 'src/app/services/city-game.service';
import { NgForm } from '@angular/forms';
import {} from 'googlemaps';
import { PlaceInGame } from 'src/app/models/place-in-game';

@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.component.html',
  styleUrls: ['./add-places.component.css'],
})
export class AddPlacesComponent {
  private countPlaces: number = 1;

  placeInGame: PlaceInGame;

  // @ViewChild('map') mapElement: any;
  // map: google.maps.Map;
  // private const center: google.maps.LatLngLiteral = { center: {lat: 30, lng: -110}, zoom: 8, mapId: '1234' } as google.maps.MapOptions;

  // key = AIzaSyCjRxKpt1rFfCDXUl0zd1_tqZcvp1ldWhY

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {
    this.placeInGame = new PlaceInGame();
  }

  // ngOnInit(): void {
  //   const mapProperties = {
  //     center: new google.maps.LatLng(35.2271, -80.8431),
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  // }

  onSubmit() {
    console.log('Hello Add New Place');

    console.log(this.cityGameService.getCityGameObject());
    console.log(this.placeInGame.address);
    console.log(this.placeInGame.legend);

    this.placeInGame.orderId = this.countPlaces;
    this.placeInGame.latitudeCoord = 1.1;
    this.placeInGame.longitudeCoord = 1.0;
    this.placeInGame.photoLink = '';
    this.placeInGame.cityGame = this.cityGameService.getCityGameObject();

    this.cityGameService
      .addNewPlaceToGame(this.placeInGame)
      .subscribe((resp) => {});

    this.addNewPlace();
  }

  addNewPlace() {
    console.log('Hej Hej Hej');
    // let newPlaceButton = document.createElement('button');

    let newPlaceButton = this.renderer.createElement('button');
    newPlaceButton.innerText = `Place ${this.countPlaces++}`;
    newPlaceButton.setAttribute('class', 'icon-place-button');

    let parent = document.getElementById('places-track');

    if (!!document.getElementById('zero-places-span')) {
      this.renderer.removeChild(
        parent,
        document.getElementById('zero-places-span')
      );
    }
    // parent?.appendChild(newPlaceButton);
    this.renderer.appendChild(parent, newPlaceButton);
  }

  // initMap() {
  //   this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     this.center,
  //     zoom: 8
  //   });
  // }
}
