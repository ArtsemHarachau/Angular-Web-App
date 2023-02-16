import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCityGameComponent } from './components/create-city-game/create-city-game.component';
import { AddPlacesComponent } from './components/add-places/add-places.component';

const routes: Routes = [
  { path: 'createcitygame', component: CreateCityGameComponent }, { path: 'addplaces', component: AddPlacesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
