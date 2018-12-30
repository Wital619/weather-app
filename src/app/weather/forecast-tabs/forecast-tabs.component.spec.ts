import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTabsComponent } from './forecast-tabs.component';

describe('ForecastTabsComponent', () => {
  let component: ForecastTabsComponent;
  let fixture: ComponentFixture<ForecastTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
