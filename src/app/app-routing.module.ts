import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCityGameComponent } from './components/create-city-game/create-city-game.component';
import { AddPlacesComponent } from './components/add-places/add-places.component';
import { StartComponent } from './components/start/start.component';
import { GetAllCityGamesComponent } from './components/get-all-city-games/get-all-city-games.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'createcitygame', component: CreateCityGameComponent },
  { path: 'addplaces', component: AddPlacesComponent },
  { path: 'allcitygames', component: GetAllCityGamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
