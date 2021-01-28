import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FollowedComponent } from './followed.component';

describe('FollowedComponent', () => {
  let component: FollowedComponent;
  let fixture: ComponentFixture<FollowedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
