import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCityGameComponent } from './components/create-city-game/create-city-game.component';

const routes: Routes = [
  { path: 'createcitygame', component: CreateCityGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
