import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleSubTitleComponent } from './title-sub-title.component';

describe('TitleSubTitleComponent', () => {
  let component: TitleSubTitleComponent;
  let fixture: ComponentFixture<TitleSubTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleSubTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleSubTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
