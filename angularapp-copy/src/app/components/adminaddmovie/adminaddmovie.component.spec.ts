import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddmovieComponent } from './adminaddmovie.component';

describe('AdminaddmovieComponent', () => {
  let component: AdminaddmovieComponent;
  let fixture: ComponentFixture<AdminaddmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
