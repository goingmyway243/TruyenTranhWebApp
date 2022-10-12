import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComicsPageComponent } from './admin-comics-page.component';

describe('AdminComicsPageComponent', () => {
  let component: AdminComicsPageComponent;
  let fixture: ComponentFixture<AdminComicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComicsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
