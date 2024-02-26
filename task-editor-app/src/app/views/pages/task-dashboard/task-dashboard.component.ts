import { Component, ElementRef } from '@angular/core';
import { AuthGuard } from '../../../helpers/auth.guard';
import { TaskListSidebarComponent } from '../../public-components/task-list-sidebar/task-list-sidebar.component';
import { TaskListHeaderComponent } from '../../public-components/task-list-header/task-list-header.component';
import { TaskListCreateFormComponent } from '../../public-components/task-list-create-form/task-list-create-form.component';
import { CommonModule, NgIf } from '@angular/common';
import { AssignmentModel } from '../../../shared/models/assignment.model';
import { TaskContainerComponent } from '../../public-components/task-container/task-container.component';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [TaskListSidebarComponent, TaskListHeaderComponent, TaskListCreateFormComponent, TaskContainerComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {
  showCreateAssignmentListForm: boolean = false;
  listAssignment: AssignmentModel[] = [];
  assignmentListTitle: string = "";
  assignmentListId!: number;
  currentErrorStatus: boolean = false;
  currentErrorMessage: string = "";

  constructor( ) { }

  toggleAssignmentListComponent(){
    this.showCreateAssignmentListForm = !this.showCreateAssignmentListForm
  }

  showListAssignment(currentListAssignment?: AssignmentModel[], listErrorMessage?: string, currentName?: string, currentId?: number) {
    if(listErrorMessage != undefined){
      this.currentErrorMessage = listErrorMessage;
      this.listAssignment = [];
      if(currentName != undefined)
        this.assignmentListTitle = currentName;
      if(currentId != undefined)
        this.assignmentListId = currentId;
    }
    if(currentListAssignment != undefined){
      this.currentErrorMessage = "";
      this.listAssignment = currentListAssignment;
      if(currentName != undefined)
        this.assignmentListTitle = currentName;
      if(currentId != undefined)
        this.assignmentListId = currentId;
    }
  }

}
