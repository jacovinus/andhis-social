import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationDisplayComponent } from './publication-display.component';

describe('PublicationDisplayComponent', () => {
  let component: PublicationDisplayComponent;
  let fixture: ComponentFixture<PublicationDisplayComponent>;

  beforeEach(async(() => {
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
