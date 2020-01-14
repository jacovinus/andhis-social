import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotlistitemComponent } from './hotlistitem.component';

describe('HotlistitemComponent', () => {
  let component: HotlistitemComponent;
  let fixture: ComponentFixture<HotlistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotlistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
