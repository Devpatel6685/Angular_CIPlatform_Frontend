import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionListingComponent } from './mission-listing.component';

describe('MissionListingComponent', () => {
  let component: MissionListingComponent;
  let fixture: ComponentFixture<MissionListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
