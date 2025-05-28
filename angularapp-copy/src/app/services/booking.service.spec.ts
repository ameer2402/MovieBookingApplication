import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule here
    });
    service = TestBed.inject(BookingService);
  });

  fit('Frontend_day34_should_create_Booking_service', () => {
    expect(service).toBeTruthy();
  });
});
