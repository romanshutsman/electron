import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVersionsComponent } from './dialog-versions.component';

describe('DialogVersionsComponent', () => {
  let component: DialogVersionsComponent;
  let fixture: ComponentFixture<DialogVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
