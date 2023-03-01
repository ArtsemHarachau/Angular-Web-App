import {
  Component,
  Renderer2,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
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
  // ERROR: Geocode was not successful for the following reason: ZERO_RESULTS

  //OVER_QUERY_LIMIT error

  infoWindow!: google.maps.InfoWindow;

  geocoder!: google.maps.Geocoder;
  map!: google.maps.Map;
  possiblePlaceMarker!: google.maps.Marker;
  private mapsMarkers: google.maps.Marker[] = [];

  private placesArray: PlaceInGame[] = [];
  public placeInGame: PlaceInGame;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {
    this.placeInGame = new PlaceInGame();
    this.possiblePlaceMarker = new google.maps.Marker();
    this.placesArray = cityGameService.getGamePlacesArray();
    this.mapsMarkers = this.cityGameService.getMapsMarkersArray();
  }

  private mapInitializer() {
    this.geocoder = new google.maps.Geocoder();

    let lat = 52.46;
    let long = 16.94;
    let coordinates = new google.maps.LatLng(lat, long);

    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 8,
      mapTypeControl: false,
      fullscreenControl: false,
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    if (this.mapsMarkers !== null) {
      this.mapsMarkers.forEach((element) => {
        element.setMap(this.map);
      });
    }

    this.map.addListener('click', (mapsMouseEvent) => {
      if (!!this.possiblePlaceMarker.getMap()) {
        this.possiblePlaceMarker.setMap(null);
      }

      if (!!this.possiblePlaceMarker) {
        this.possiblePlaceMarker.setMap(null);
      }
      this.possiblePlaceMarker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map,
      });
      this.possiblePlaceMarker.setMap(this.map);

      this.addressFromCoord(mapsMouseEvent.latLng);
    });
  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  async addressFromCoord(coords: google.maps.LatLng) {
    this.geocoder.geocode({ location: coords }, function (results) {
      let addressElem = document.getElementById('address') as HTMLInputElement;
      addressElem.value = results[0].formatted_address;
    });
  }

  updateImagePreview() {
    var imageUrl = document.getElementById('imageUrl') as HTMLInputElement;
    var imageUrlVal = imageUrl.value;
    var imagePreview = document.getElementById(
      'image-preview'
    ) as HTMLImageElement;
    var docVal = document.getElementById('error-message');

    if (imageUrlVal.match(/\.(jpeg|jpg|png)$/) == null) {
      imagePreview.src = '';
      docVal!.innerHTML = "It's not a URL of an image.";
      return;
    }
    imagePreview.src = imageUrl.value;
    docVal!.innerHTML = '';
  }

  private saveNewPlace(
    address: string,
    legend: string,
    imageLink: string,
    maps: google.maps.Map,
    placeInGame: PlaceInGame,
    cityGameService: CityGameService,
    markers: google.maps.Marker[],
    placesArray: PlaceInGame[]
  ) {
    if (legend !== '') {
      console.log("Let's go!");

      console.log('ADDRESS EVENT: -> ', address);

      this.geocoder.geocode({ address: address }, function (results, status) {
        if (address !== '') {
          if (status == 'OK') {
            console.log('ADDRESS IS OK!');

            //clear address, legend and imageUrl inputs html elements
            placeInGame.address = '';
            placeInGame.legend = '';
            placeInGame.photoLink = '';

            //create new marker on maps
            markers.push(
              new google.maps.Marker({
                position: results[0].geometry.location,
                label: (markers.length + 1).toString(),
                title: results[0].geometry.location.toString(),
              })
            );

            markers[markers.length - 1].addListener('click', function (e) {
              console.log(this.getPosition()?.toJSON());
              this.setMap(null);
            });

            markers[markers.length - 1].setMap(maps);

            //preparing placeInGame object for sending to the database
            // placeInGame.orderId = markers.length;
            // placeInGame.latitudeCoord =
            //   results[0].geometry.location.toJSON().lat;
            // placeInGame.longitudeCoord =
            //   results[0].geometry.location.toJSON().lng;
            // placeInGame.address = address;
            // placeInGame.legend = legend;
            // placeInGame.photoLink = imageLink;
            // placeInGame.cityGame = cityGameService.getCityGameObject();

            placesArray.push(new PlaceInGame());
            let lengthOfPlacesArray = placesArray.length;

            placesArray[lengthOfPlacesArray - 1].orderId = lengthOfPlacesArray;
            placesArray[lengthOfPlacesArray - 1].address = address;
            placesArray[lengthOfPlacesArray - 1].legend = legend;
            placesArray[lengthOfPlacesArray - 1].photoLink = imageLink;
            placesArray[lengthOfPlacesArray - 1].latitudeCoord =
              results[0].geometry.location.toJSON().lat;
            placesArray[lengthOfPlacesArray - 1].longitudeCoord =
              results[0].geometry.location.toJSON().lng;
            placesArray[lengthOfPlacesArray - 1].cityGame =
              cityGameService.getCityGameObject();

            console.log(JSON.stringify(placesArray[lengthOfPlacesArray - 1]));

            cityGameService.setGamePlacesArray(placesArray);

            // console.log(JSON.stringify(placeInGame));

            //send placeInGame object to database
            // cityGameService
            //   .addNewPlaceToGame(placeInGame)
            //   .subscribe((resp) => {});
          } else {
            console.log('ADDRESS IS NOT OK!');
            alert(
              'Your address does not exist! Please enter address correctly: ' +
                status
            );
          }
        } else {
          alert('Address is empty!');
        }
      });
    } else {
      alert('Legend of place is empty!');
    }
  }

  onSubmit() {
    let addressElem = document.getElementById('address') as HTMLInputElement;
    let legendElem = document.getElementById('legend') as HTMLInputElement;
    let imageLink = document.getElementById('imageUrl') as HTMLInputElement;

    this.saveNewPlace(
      addressElem.value,
      legendElem.value,
      imageLink.value,
      this.map,
      this.placeInGame,
      this.cityGameService,
      this.mapsMarkers,
      this.placesArray
    );

    if (!!this.possiblePlaceMarker.getMap()) {
      this.possiblePlaceMarker.setMap(null);
    }

    console.log(this.placesArray.length);

    this.placeInGame.cityGame = this.cityGameService.getCityGameObject();
    console.log(this.cityGameService.getCityGameObject());
  }
}
