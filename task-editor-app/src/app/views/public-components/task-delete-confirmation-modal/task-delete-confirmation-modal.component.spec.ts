import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDeleteConfirmationModalComponent } from './task-delete-confirmation-modal.component';

describe('TaskDeleteConfirmationModalComponent', () => {
  let component: TaskDeleteConfirmationModalComponent;
  let fixture: ComponentFixture<TaskDeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDeleteConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
