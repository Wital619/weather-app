import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryIconComponent } from './country-icon.component';

describe('CountryIconComponent', () => {
  let component: CountryIconComponent;
  let fixture: ComponentFixture<CountryIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
