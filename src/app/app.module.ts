import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCityGameComponent } from './components/create-city-game/create-city-game.component';
import { CityGameService } from './services/city-game.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateCityGameComponent,
    CreateCityGameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [CityGameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
