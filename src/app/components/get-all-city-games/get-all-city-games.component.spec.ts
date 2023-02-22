import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCityGamesComponent } from './get-all-city-games.component';

describe('GetAllCityGamesComponent', () => {
  let component: GetAllCityGamesComponent;
  let fixture: ComponentFixture<GetAllCityGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllCityGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCityGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
