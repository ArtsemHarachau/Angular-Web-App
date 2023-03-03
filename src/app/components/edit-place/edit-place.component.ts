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
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css'],
})
export class EditPlaceComponent {
  infoWindow!: google.maps.InfoWindow;

  geocoder!: google.maps.Geocoder;
  map!: google.maps.Map;
  placeMarker!: google.maps.Marker;
  // private mapsMarkers: google.maps.Marker[] = [];

  placeInGame: PlaceInGame;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {
    this.placeInGame = new PlaceInGame();
  }

  ngOnInit() {
    this.placeInGame = this.cityGameService.getPlaceForUpdate();
    console.log('EDIT -> HEJKA: ', JSON.stringify(this.placeInGame));
  }

  mapInitializer() {
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

    this.map.addListener('click', (mapsMouseEvent) => {
      this.placeMarker.setMap(null);
      // if (!!this.placeMarker) {
      //   this.placeMarker.setMap(null);
      // }
      this.placeMarker = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map,
      });
      this.placeMarker.setMap(this.map);

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

    let latLng = new google.maps.LatLng(
      this.placeInGame.latitudeCoord!,
      this.placeInGame.longitudeCoord!,
      false
    );

    this.placeMarker = new google.maps.Marker({
      position: latLng,
      label: this.placeInGame.orderId?.toString(),
      title: latLng.toString(),
    });

    this.placeMarker.addListener('click', function (e) {
      console.log(this.getPosition()?.toJSON());
      this.setMap(null);
    });

    this.placeMarker.setMap(this.map);
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

  async addressFromCoord(coords: google.maps.LatLng) {
    this.geocoder.geocode({ location: coords }, function (results) {
      let addressElem = document.getElementById('address') as HTMLInputElement;
      addressElem.value = results[0].formatted_address;
    });
  }

  editPlace(
    address: string,
    legend: string,
    imageLink: string,
    maps: google.maps.Map,
    placeInGame: PlaceInGame,
    cityGameService: CityGameService,
    marker: google.maps.Marker
  ) {
    // let legendElem = document.getElementById('legend') as HTMLTextAreaElement;
    if (legend !== '') {
      console.log("Let's go!");

      // let addressElem = document.getElementById('address') as HTMLInputElement;
      // console.log('ADDRESS EVENT: -> ', addressElem.value);

      this.geocoder.geocode({ address: address }, function (results, status) {
        if (address !== '') {
          if (status == 'OK') {
            console.log('ADDRESS IS OK!');

            //create new marker on maps

            // marker.setPosition(results[0].geometry.location);

            // marker = new google.maps.Marker({
            //   position: results[0].geometry.location,
            //   label: (111).toString(),
            //   title: results[0].geometry.location.toString(),
            // });

            // marker.addListener('click', function (e) {
            //   console.log(this.getPosition()?.toJSON());
            //   this.setMap(null);
            // });

            // marker.setMap(maps);

            placeInGame.latitudeCoord =
              results[0].geometry.location.toJSON().lat;
            placeInGame.longitudeCoord =
              results[0].geometry.location.toJSON().lng;
            placeInGame.address = address;
            placeInGame.legend = legend;
            placeInGame.photoLink = imageLink;

            let placesArrayForUpdate = cityGameService.getGamePlacesArray();
            placesArrayForUpdate[placeInGame.orderId! - 1] = placeInGame;

            cityGameService.setGamePlacesArray(placesArrayForUpdate);

            let markers = cityGameService.getMapsMarkersArray();

            markers[placeInGame.orderId! - 1].setPosition(
              results[0].geometry.location
            );

            cityGameService.setMapsMarkersArray(markers);
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

    this.editPlace(
      addressElem.value,
      legendElem.value,
      imageLink.value,
      this.map,
      this.placeInGame,
      this.cityGameService,
      this.placeMarker
    );

    this.placeInGame.cityGame = this.cityGameService.getCityGameObject();
    console.log(this.cityGameService.getCityGameObject());
  }
}
