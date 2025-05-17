import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassEyeComponent } from './pass-eye.component';

describe('PassEyeComponent', () => {
  let component: PassEyeComponent;
  let fixture: ComponentFixture<PassEyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassEyeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
