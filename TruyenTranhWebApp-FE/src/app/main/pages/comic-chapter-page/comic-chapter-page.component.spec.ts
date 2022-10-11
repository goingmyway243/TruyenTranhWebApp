import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicChapterPageComponent } from './comic-chapter-page.component';

describe('ComicChapterPageComponent', () => {
  let component: ComicChapterPageComponent;
  let fixture: ComponentFixture<ComicChapterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicChapterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicChapterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
