import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostlistSidebarComponent } from './hostlist-sidebar.component';

describe('HostlistSidebarComponent', () => {
  let component: HostlistSidebarComponent;
  let fixture: ComponentFixture<HostlistSidebarComponent>;

  beforeEach(async(() => {
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
