import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddChapterPageComponent } from './admin-add-chapter-page.component';

describe('AdminAddChapterPageComponent', () => {
  let component: AdminAddChapterPageComponent;
  let fixture: ComponentFixture<AdminAddChapterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddChapterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddChapterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
