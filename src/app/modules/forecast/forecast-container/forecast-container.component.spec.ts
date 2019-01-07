import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastContainerComponent } from './forecast-container.component';

describe('ForecastContainerComponent', () => {
  let component: ForecastContainerComponent;
  let fixture: ComponentFixture<ForecastContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
