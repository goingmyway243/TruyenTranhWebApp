import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniComicItemComponent } from './mini-comic-item.component';

describe('MiniComicItemComponent', () => {
  let component: MiniComicItemComponent;
  let fixture: ComponentFixture<MiniComicItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniComicItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniComicItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
