import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComicItemComponent } from './main-comic-item.component';

describe('MainComicItemComponent', () => {
  let component: MainComicItemComponent;
  let fixture: ComponentFixture<MainComicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComicItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
