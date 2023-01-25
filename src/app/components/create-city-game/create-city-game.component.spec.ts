import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCityGameComponent } from './create-city-game.component';

describe('CreateCityGameComponent', () => {
  let component: CreateCityGameComponent;
  let fixture: ComponentFixture<CreateCityGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCityGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCityGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
