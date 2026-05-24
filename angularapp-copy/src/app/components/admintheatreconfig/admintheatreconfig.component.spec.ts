import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintheatreconfigComponent } from './admintheatreconfig.component';

describe('AdmintheatreconfigComponent', () => {
  let component: AdmintheatreconfigComponent;
  let fixture: ComponentFixture<AdmintheatreconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmintheatreconfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintheatreconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
