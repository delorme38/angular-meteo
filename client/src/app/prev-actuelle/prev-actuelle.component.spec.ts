import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevActuelleComponent } from './prev-actuelle.component';

describe('PrevActuelleComponent', () => {
  let component: PrevActuelleComponent;
  let fixture: ComponentFixture<PrevActuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevActuelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevActuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
