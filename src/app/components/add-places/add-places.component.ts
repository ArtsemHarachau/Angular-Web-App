import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGameService } from 'src/app/services/city-game.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.component.html',
  styleUrls: ['./add-places.component.css'],
})
export class AddPlacesComponent {
  private countPlaces: number = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {}

  onSubmit() {
    console.log('Hello Add New Place');
    this.addNewPlace();
  }

  addNewPlace() {
    console.log('Hej Hej Hej');
    // let newPlaceButton = document.createElement('button');

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
    // parent?.appendChild(newPlaceButton);
    this.renderer.appendChild(parent, newPlaceButton);
  }
}
