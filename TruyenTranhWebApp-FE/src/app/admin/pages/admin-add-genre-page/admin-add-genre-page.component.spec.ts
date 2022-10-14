import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddGenrePageComponent } from './admin-add-genre-page.component';

describe('AdminAddGenrePageComponent', () => {
  let component: AdminAddGenrePageComponent;
  let fixture: ComponentFixture<AdminAddGenrePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddGenrePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddGenrePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
