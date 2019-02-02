import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldresultsComponent } from './oldresults.component';

describe('OldresultsComponent', () => {
  let component: OldresultsComponent;
  let fixture: ComponentFixture<OldresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
