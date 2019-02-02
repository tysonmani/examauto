import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoresultsComponent } from './demoresults.component';

describe('DemoresultsComponent', () => {
  let component: DemoresultsComponent;
  let fixture: ComponentFixture<DemoresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
