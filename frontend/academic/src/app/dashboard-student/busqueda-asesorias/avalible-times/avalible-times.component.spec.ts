import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalibleTimesComponent } from './avalible-times.component';

describe('AvalibleTimesComponent', () => {
  let component: AvalibleTimesComponent;
  let fixture: ComponentFixture<AvalibleTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvalibleTimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvalibleTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
