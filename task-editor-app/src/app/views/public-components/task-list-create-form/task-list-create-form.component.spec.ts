import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListCreateFormComponent } from './task-list-create-form.component';

describe('TaskListCreateFormComponent', () => {
  let component: TaskListCreateFormComponent;
  let fixture: ComponentFixture<TaskListCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
