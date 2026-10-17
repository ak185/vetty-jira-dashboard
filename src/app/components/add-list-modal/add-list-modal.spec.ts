import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListModalComponent } from './add-list-modal';

describe('AddListModalComponent', () => {
  let component: AddListModalComponent;
  let fixture: ComponentFixture<AddListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddListModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
