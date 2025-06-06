import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleBtnComponent } from './circle-btn.component';

describe('CircleBtnComponent', () => {
  let component: CircleBtnComponent;
  let fixture: ComponentFixture<CircleBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
