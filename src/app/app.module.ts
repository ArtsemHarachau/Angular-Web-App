import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCityGameComponent } from './components/create-city-game/create-city-game.component';
import { CityGameService } from './services/city-game.service';
import { FormsModule } from '@angular/forms';
import { AddPlacesComponent } from './components/add-places/add-places.component';
import { StartComponent } from './components/start/start.component';
import { GetAllCityGamesComponent } from './components/get-all-city-games/get-all-city-games.component';
import { SummaryComponent } from './components/summary/summary.component';
import { EditPlaceComponent } from './components/edit-place/edit-place.component';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CreateCityGameComponent,
    AddPlacesComponent,
    StartComponent,
    GetAllCityGamesComponent,
    SummaryComponent,
    EditPlaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCjRxKpt1rFfCDXUl0zd1_tqZcvp1ldWhY',
    // }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCjRxKpt1rFfCDXUl0zd1_tqZcvp1ldWhY',
    // }),
  ],
  providers: [CityGameService],
  bootstrap: [AppComponent],
})
export class AppModule {}

//20 LINE IN PACKAGE-LOCK.JSON
// "@types/google.maps": "^3.52.0",
// "@types/googlemaps": "^3.43.3",

//3278 LINE IN PACKAGE-LOCK.JSON
// "node_modules/@types/google.maps": {
//   "version": "3.52.0",
//   "resolved": "https://registry.npmjs.org/@types/google.maps/-/google.maps-3.52.0.tgz",
//   "integrity": "sha512-cIwkgSBUOCerEwEpAahg1SxUqqGV+D786TkVWrcZZyPvuCozmXFtzQcpOzvUXBtTUqDzEbCDGlAXDfDSYFXFIw=="
// },
// "node_modules/@types/googlemaps": {
//   "version": "3.43.3",
//   "resolved": "https://registry.npmjs.org/@types/googlemaps/-/googlemaps-3.43.3.tgz",
//   "integrity": "sha512-ZWNoz/O8MPEpiajvj7QiqCY8tTLFNqNZ/a+s+zTV58wFVNAvvqV4bdGfnsjTb5Cs4V6wEsLrX8XRhmnyYJ2Tdg==",
//   "deprecated": "Types for the Google Maps browser API have moved to @types/google.maps. Note: these types are not for the googlemaps npm package, which is a Node API."
// },

//22 LINE IN PACKAGE.JSON
// "@types/google.maps": "^3.52.0",
// "@types/googlemaps": "^3.43.3",
