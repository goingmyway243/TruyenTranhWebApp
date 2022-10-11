import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoHeightInputComponent } from './auto-height-input.component';

describe('AutoHeightInputComponent', () => {
  let component: AutoHeightInputComponent;
  let fixture: ComponentFixture<AutoHeightInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoHeightInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoHeightInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
