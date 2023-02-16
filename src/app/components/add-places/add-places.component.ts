import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGameService } from 'src/app/services/city-game.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.component.html',
  styleUrls: ['./add-places.component.css']
})
export class AddPlacesComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService
  ) {}

  onSubmit() {
    console.log('Hello Add New Place');
    this.addNewPlace();
  }

  addNewPlace() {
    console.log('Hej Hej Hej');
  }
}
