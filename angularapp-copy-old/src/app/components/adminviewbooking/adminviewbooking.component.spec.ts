import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewbookingComponent } from './adminviewbooking.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ManageBookingComponent', () => {
  let component: AdminviewbookingComponent;
  let fixture: ComponentFixture<AdminviewbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        RouterTestingModule 
      ], 
      declarations: [ AdminviewbookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_day30_should_have_bookings_arrays_declared', () => {
    expect(component).toBeTruthy();
    expect((component as any).bookings).toBeDefined();
  });

});
