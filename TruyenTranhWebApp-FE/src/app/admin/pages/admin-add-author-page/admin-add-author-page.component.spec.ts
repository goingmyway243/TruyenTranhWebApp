import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAuthorPageComponent } from './admin-add-author-page.component';

describe('AdminAddAuthorPageComponent', () => {
  let component: AdminAddAuthorPageComponent;
  let fixture: ComponentFixture<AdminAddAuthorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAuthorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAuthorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
