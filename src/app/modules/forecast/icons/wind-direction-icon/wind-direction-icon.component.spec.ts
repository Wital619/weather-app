import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindDirectionIconComponent } from './wind-direction-icon.component';

describe('WindDirectionIconComponent', () => {
  let component: WindDirectionIconComponent;
  let fixture: ComponentFixture<WindDirectionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindDirectionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindDirectionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
