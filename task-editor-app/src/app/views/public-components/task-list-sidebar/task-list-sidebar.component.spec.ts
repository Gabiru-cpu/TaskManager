import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListSidebarComponent } from './task-list-sidebar.component';

describe('TaskListSidebarComponent', () => {
  let component: TaskListSidebarComponent;
  let fixture: ComponentFixture<TaskListSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
