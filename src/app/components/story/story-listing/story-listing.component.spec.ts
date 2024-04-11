import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListingComponent } from './story-listing.component';

describe('StoryListingComponent', () => {
  let component: StoryListingComponent;
  let fixture: ComponentFixture<StoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
