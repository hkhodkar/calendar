import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLinesComponent } from './time-lines.component';

describe('TimeLinesComponentComponent', () => {
  let component: TimeLinesComponent;
  let fixture: ComponentFixture<TimeLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeLinesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TimeLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
