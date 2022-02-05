import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevHeuresComponent } from './prev-heures.component';

describe('PrevHeuresComponent', () => {
  let component: PrevHeuresComponent;
  let fixture: ComponentFixture<PrevHeuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevHeuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevHeuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
