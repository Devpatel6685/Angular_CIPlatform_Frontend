import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteeringMissionComponent } from './volunteering-mission.component';

describe('VolunteeringMissionComponent', () => {
  let component: VolunteeringMissionComponent;
  let fixture: ComponentFixture<VolunteeringMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteeringMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolunteeringMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
