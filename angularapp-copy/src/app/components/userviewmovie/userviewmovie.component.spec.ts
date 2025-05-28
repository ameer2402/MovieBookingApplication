import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewmovieComponent } from './userviewmovie.component';

describe('UserviewmovieComponent', () => {
  let component: UserviewmovieComponent;
  let fixture: ComponentFixture<UserviewmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
