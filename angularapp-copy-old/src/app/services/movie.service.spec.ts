import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule here
    });
    service = TestBed.inject(MovieService);
  });

  fit('Frontend_day34_should_create_movie_service', () => {
    expect(service).toBeTruthy();
  });
});
