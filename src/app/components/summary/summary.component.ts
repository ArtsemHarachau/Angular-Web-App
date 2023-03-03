import { Component, Input, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { PlaceInGame } from 'src/app/models/place-in-game';
import { CityGameService } from 'src/app/services/city-game.service';
import { NgFor, NgForOf } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  places: PlaceInGame[] = [];

  buttons: HTMLButtonElement[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.places = this.cityGameService.getGamePlacesArray();
    console.log(this.places);
  }

  ngAfterViewInit() {}

  onSubmit() {
    this.cityGameService
      .addAllPlacesToGame(this.places)
      .subscribe((resp) => {});
  }

  refresh() {
    this.cdr.detectChanges();
  }

  editPlace(orderID: number) {
    this.cityGameService.setPlaceForUpdate(this.places[orderID - 1]);
    let markers = this.cityGameService.getMapsMarkersArray();
    let coordinates = new google.maps.LatLng(
      this.places[orderID - 1].latitudeCoord!,
      this.places[orderID - 1].longitudeCoord!,
      false
    );
    markers[orderID - 1].setPosition(coordinates);
    this.cityGameService.setMapsMarkersArray(markers);
  }

  deletePlace(orderID: number) {
    this.places.splice(orderID - 1, 1);

    let markers = this.cityGameService.getMapsMarkersArray();
    markers.splice(orderID - 1, 1);

    if (orderID - 1 == 0) {
      for (let i = 0; i < this.places.length; i++) {
        this.places[i].orderId = this.places[i].orderId! - 1;
        markers[i].setLabel(this.places[i].orderId!.toString());
      }
    } else {
      for (let i = orderID - 1; i < this.places.length; i++) {
        this.places[i].orderId = this.places[i].orderId! - 1;
        markers[i].setLabel(this.places[i].orderId!.toString());
      }
    }

    this.cityGameService.setGamePlacesArray(this.places);
    this.cityGameService.setMapsMarkersArray(markers);

    this.places = this.cityGameService.getGamePlacesArray();

    console.log('UPDATED : ', this.places);

    this.refresh();
  }
}
