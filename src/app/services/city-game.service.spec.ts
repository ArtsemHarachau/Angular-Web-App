import { TestBed } from '@angular/core/testing';

import { CityGameService } from './city-game.service';

describe('CityGameService', () => {
  let service: CityGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
