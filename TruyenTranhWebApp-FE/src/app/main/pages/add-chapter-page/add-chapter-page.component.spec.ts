import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChapterPageComponent } from './add-chapter-page.component';

describe('AddChapterPageComponent', () => {
  let component: AddChapterPageComponent;
  let fixture: ComponentFixture<AddChapterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChapterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChapterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
