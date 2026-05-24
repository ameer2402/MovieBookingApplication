import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookingmovieComponent } from './userbookingmovie.component';

describe('UserbookingmovieComponent', () => {
  let component: UserbookingmovieComponent;
  let fixture: ComponentFixture<UserbookingmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbookingmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbookingmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
