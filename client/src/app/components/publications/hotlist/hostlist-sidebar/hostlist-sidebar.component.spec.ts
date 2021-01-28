import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HostlistSidebarComponent } from './hostlist-sidebar.component';

describe('HostlistSidebarComponent', () => {
  let component: HostlistSidebarComponent;
  let fixture: ComponentFixture<HostlistSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HostlistSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostlistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
