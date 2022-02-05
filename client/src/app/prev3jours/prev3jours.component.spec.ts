import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prev3joursComponent } from './prev3jours.component';

describe('Prev3joursComponent', () => {
  let component: Prev3joursComponent;
  let fixture: ComponentFixture<Prev3joursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Prev3joursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Prev3joursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
