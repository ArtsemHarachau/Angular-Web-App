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

  addressInputElem = document.getElementById('address') as HTMLInputElement;

  infoWindow!: google.maps.InfoWindow;

  geocoder!: google.maps.Geocoder;
  map!: google.maps.Map;
  possiblePlaceMarker!: google.maps.Marker;
  private mapsMarkers: google.maps.Marker[] = [];

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

  
  //updateImagePreview() {
  //   var imageUrl = document.getElementById('image-url') as HTMLInputElement;
  //   var imageUrlVal = imageUrl.value;
  //   var imagePreview = document.getElementById('image-preview') as HTMLImageElement;
  //   if (imageUrlVal.match(/\.(jpeg|jpg|png)$/) == null) {
  //     imagePreview.src = "";
  //     var docVal = document.getElementById('error-message');
  //     docVal!.innerHTML = "It's not a URL of an image.";
  //     return;
  //    }
  //    imagePreview.src = imageUrl.value;
  //   document.getElementById('error-message')!.innerHTML = "";
  // }


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

  saveNewPlace(
    address: string,
    legend: string,
    maps: google.maps.Map,
    placeInGame: PlaceInGame,
    cityGameService: CityGameService,
    markers: google.maps.Marker[]
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
              placeInGame.orderId = markers.length;
              placeInGame.latitudeCoord =
                results[0].geometry.location.toJSON().lat;
              placeInGame.longitudeCoord =
                results[0].geometry.location.toJSON().lng;
              placeInGame.address = address;
              placeInGame.legend = legend;
              placeInGame.photoLink = '';
              placeInGame.cityGame = cityGameService.getCityGameObject();

              console.log(JSON.stringify(placeInGame));

              //send placeInGame object to database
              cityGameService
                .addNewPlaceToGame(placeInGame)
                .subscribe((resp) => {});
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

    this.saveNewPlace(
      addressElem.value,
      legendElem.value,
      this.map,
      this.placeInGame,
      this.cityGameService,
      this.mapsMarkers
    );

    this.placeInGame.cityGame = this.cityGameService.getCityGameObject();
    console.log(this.cityGameService.getCityGameObject());

    //this.updateImagePreview;

    this.addNewPlace();
  }

  addNewPlace() {
    console.log('Hej Hej Hej');

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

    this.renderer.appendChild(parent, newPlaceButton);
  }
}
