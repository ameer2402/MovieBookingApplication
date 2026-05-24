import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewmovieComponent } from './adminviewmovie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieListComponent', () => {
  let component: AdminviewmovieComponent;
  let fixture: ComponentFixture<AdminviewmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        RouterTestingModule 
      ], 
      declarations: [ AdminviewmovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_day30_create_Movie_List_Component_with_movies_array', () => {
    expect(component).toBeTruthy();
    expect((component as any).movies).toBeDefined();
  });

  fit('Frontend_day31_should_have_updateMovie_method', () => {
    expect((component as any).updateMovie).toBeDefined();
    expect(typeof (component as any).updateMovie).toBe('function');
  });

  fit('Frontend_day31_should_have_deleteMovie_method', () => {
    expect((component as any).deleteMovie).toBeDefined();
    expect(typeof (component as any).deleteMovie).toBe('function');
  });


});
