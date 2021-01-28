import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotlistPopupComponent } from './hotlist-popup.component';

describe('HotlistPopupComponent', () => {
  let component: HotlistPopupComponent;
  let fixture: ComponentFixture<HotlistPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlistPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
