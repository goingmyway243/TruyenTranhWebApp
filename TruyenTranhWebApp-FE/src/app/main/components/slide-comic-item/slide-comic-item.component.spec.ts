import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideComicItemComponent } from './slide-comic-item.component';

describe('SlideComicItemComponent', () => {
  let component: SlideComicItemComponent;
  let fixture: ComponentFixture<SlideComicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideComicItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideComicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
