import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldcontestsComponent } from './oldcontests.component';

describe('OldcontestsComponent', () => {
  let component: OldcontestsComponent;
  let fixture: ComponentFixture<OldcontestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldcontestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldcontestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
