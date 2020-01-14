import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlistPopupComponent } from './hotlist-popup.component';

describe('HotlistPopupComponent', () => {
  let component: HotlistPopupComponent;
  let fixture: ComponentFixture<HotlistPopupComponent>;

  beforeEach(async(() => {
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
