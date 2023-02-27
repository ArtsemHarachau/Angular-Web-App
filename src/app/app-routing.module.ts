import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCityGameComponent } from './components/create-city-game/create-city-game.component';
import { AddPlacesComponent } from './components/add-places/add-places.component';
import { StartComponent } from './components/start/start.component';
import { GetAllCityGamesComponent } from './components/get-all-city-games/get-all-city-games.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'createcitygame', component: CreateCityGameComponent },
  { path: 'addplaces', component: AddPlacesComponent },
  { path: 'allcitygames', component: GetAllCityGamesComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
