import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddComicPageComponent } from './admin-add-comic-page.component';

describe('AdminAddComicPageComponent', () => {
  let component: AdminAddComicPageComponent;
  let fixture: ComponentFixture<AdminAddComicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddComicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddComicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
