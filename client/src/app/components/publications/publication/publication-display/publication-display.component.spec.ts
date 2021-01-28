import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicationDisplayComponent } from './publication-display.component';

describe('PublicationDisplayComponent', () => {
  let component: PublicationDisplayComponent;
  let fixture: ComponentFixture<PublicationDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
