import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorsPageComponent } from './admin-authors-page.component';

describe('AdminAuthorsPageComponent', () => {
  let component: AdminAuthorsPageComponent;
  let fixture: ComponentFixture<AdminAuthorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
