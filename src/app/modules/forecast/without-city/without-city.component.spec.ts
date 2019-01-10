import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutCityComponent } from './without-city.component';

describe('WithoutCityComponent', () => {
  let component: WithoutCityComponent;
  let fixture: ComponentFixture<WithoutCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
