import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommandMissionDialogComponent } from './recommand-mission-dialog.component';

describe('RecommandMissionDialogComponent', () => {
  let component: RecommandMissionDialogComponent;
  let fixture: ComponentFixture<RecommandMissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommandMissionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecommandMissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
