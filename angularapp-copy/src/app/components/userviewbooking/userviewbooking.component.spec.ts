import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserviewbookingComponent } from './userviewbooking.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserviewbookingComponent', () => {
  let component: UserviewbookingComponent;
  let fixture: ComponentFixture<UserviewbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [UserviewbookingComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_day32_should_create_Userviewbooking_Component', () => {
    expect(component).toBeTruthy();
  });
});
