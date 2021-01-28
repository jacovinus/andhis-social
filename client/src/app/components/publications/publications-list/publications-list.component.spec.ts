import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicationsListComponent } from './publications-list.component';

describe('PublicationsListComponent', () => {
  let component: PublicationsListComponent;
  let fixture: ComponentFixture<PublicationsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
