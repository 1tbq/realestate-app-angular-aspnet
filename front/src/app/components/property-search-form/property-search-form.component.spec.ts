import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySearchFormComponent } from './property-search-form.component';

describe('PropertySearchFormComponent', () => {
  let component: PropertySearchFormComponent;
  let fixture: ComponentFixture<PropertySearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
