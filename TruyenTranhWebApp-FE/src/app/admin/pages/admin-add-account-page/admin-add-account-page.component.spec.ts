import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAccountPageComponent } from './admin-add-account-page.component';

describe('AdminAddAccountPageComponent', () => {
  let component: AdminAddAccountPageComponent;
  let fixture: ComponentFixture<AdminAddAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAccountPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
