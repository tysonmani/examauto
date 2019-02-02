import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepaperComponent } from './updatepaper.component';

describe('UpdatepaperComponent', () => {
  let component: UpdatepaperComponent;
  let fixture: ComponentFixture<UpdatepaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
