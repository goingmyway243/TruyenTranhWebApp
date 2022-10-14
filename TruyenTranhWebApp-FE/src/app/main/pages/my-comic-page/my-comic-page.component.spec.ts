import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComicPageComponent } from './my-comic-page.component';

describe('MyComicPageComponent', () => {
  let component: MyComicPageComponent;
  let fixture: ComponentFixture<MyComicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
