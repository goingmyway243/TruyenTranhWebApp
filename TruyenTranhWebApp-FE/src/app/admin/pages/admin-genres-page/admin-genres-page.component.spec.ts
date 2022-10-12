import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenresPageComponent } from './admin-genres-page.component';

describe('AdminGenresPageComponent', () => {
  let component: AdminGenresPageComponent;
  let fixture: ComponentFixture<AdminGenresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGenresPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
