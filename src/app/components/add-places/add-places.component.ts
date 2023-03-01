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

  addressInputElem = document.getElementById('address') as HTMLInputElement;

  infoWindow!: google.maps.InfoWindow;

  geocoder!: google.maps.Geocoder;
  map!: google.maps.Map;
  possiblePlaceMarker!: google.maps.Marker;
  private mapsMarkers: google.maps.Marker[] = [];

  placesArray: PlaceInGame[] = [];

  possibleAddress: string = '';

  private countPlaces: number = 1;

  placeInGame: PlaceInGame;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {
    this.placeInGame = new PlaceInGame();
  }

  mapInitializer() {
    this.geocoder = new google.maps.Geocoder();

    let lat = 52.46;
    let long = 16.94;
    let coordinates = new google.maps.LatLng(lat, long);

    let mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 8,
    };

    this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    this.map.addListener('click', (mapsMouseEvent) => {
      if (!!this.possiblePlaceMarker) {
        this.possiblePlaceMarker.setMap(null);
      }
      this.possiblePlaceMarker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map,
      });
      this.possiblePlaceMarker.setMap(this.map);

      this.addressFromCoord(mapsMouseEvent.latLng);
      // addressElem!.innerHTML = mapsMouseEvent.latLng.toString();
      // console.log(addressElem!.innerHTML);
      // Create a new InfoWindow.
      // this.infoWindow = new google.maps.InfoWindow({
      //   position: mapsMouseEvent.latLng,
      // });
      // this.infoWindow.setContent(
      //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
      // );
      // this.infoWindow.open(this.map);
    });
  }

  ngAfterViewInit() {
    this.mapInitializer();

    // let addressElem = document.getElementById('address') as HTMLInputElement;
    // addressElem.addEventListener('focusout', (event) => this.addressChanged());
  }

  async addressChanged() {
    let addressElem = document.getElementById('address') as HTMLInputElement;
    console.log('ADDRESS EVENT: -> ', addressElem.value);

    this.geocoder.geocode(
      { address: addressElem.value },
      function (results, status) {
        if (addressElem.value !== '') {
          if (status == 'OK') {
            console.log('ADDRESS IS OK!');
          } else {
            console.log('ADDRESS IS NOT OK!');
            alert(
              'Your address does not exist! Please enter address correctly: ' +
                status
            );
          }
        }
      }
    );
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

  saveNewPlace(
    address: string,
    legend: string,
    imageLink: string,
    maps: google.maps.Map,
    placeInGame: PlaceInGame,
    cityGameService: CityGameService,
    markers: google.maps.Marker[],
    placesArray: PlaceInGame[]
  ) {
    let legendElem = document.getElementById('legend') as HTMLTextAreaElement;
    if (legendElem.value !== '') {
      console.log("Let's go!");

      let addressElem = document.getElementById('address') as HTMLInputElement;
      console.log('ADDRESS EVENT: -> ', addressElem.value);

      this.geocoder.geocode(
        { address: addressElem.value },
        function (results, status) {
          if (addressElem.value !== '') {
            if (status == 'OK') {
              console.log('ADDRESS IS OK!');

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

              placesArray[lengthOfPlacesArray - 1].orderId =
                lengthOfPlacesArray;
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
        }
      );
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

    console.log(this.placesArray.length);

    this.placeInGame.cityGame = this.cityGameService.getCityGameObject();
    console.log(this.cityGameService.getCityGameObject());

    //this.updateImagePreview;
  }
}
