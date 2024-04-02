import { Component, ElementRef } from '@angular/core';
import { AuthGuard } from '../../../helpers/auth.guard';
import { TaskListSidebarComponent } from '../../public-components/task-list-sidebar/task-list-sidebar.component';
import { TaskListHeaderComponent } from '../../public-components/task-list-header/task-list-header.component';
import { TaskListCreateFormComponent } from '../../public-components/task-list-create-form/task-list-create-form.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { AssignmentModel } from '../../../shared/models/assignment.model';
import { TaskContainerComponent } from '../../public-components/task-container/task-container.component';
import { AuthService } from '../../../shared/services/auth.service';
import { AssignmentListModel } from '../../../shared/models/assignmentList.model';
import { AssignmentListService } from '../../../shared/services/assignment-list.service';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [TaskListSidebarComponent, TaskListHeaderComponent, TaskListCreateFormComponent, TaskContainerComponent, CommonModule],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent {
  showCreateAssignmentListForm: boolean = false;
  listAssignmentList: AssignmentListModel[] = [];
  listAssignment: AssignmentModel[] = [];
  assignmentListTitle: string = "";
  assignmentListId!: number;
  currentErrorStatus: boolean = false;
  currentErrorMessage: string = "";

  assignmentMap: { [key: number]: AssignmentModel[] } = {};

  constructor(private authService: AuthService, private assignmentListService: AssignmentListService ) { }

  ngOnInit() {
    this.getAssignmentListsByUserId();
  };

  getAssignmentListsByUserId() {
    const currentUser = this.authService.currentUserValue!.currentUser;
    const currentUserId = currentUser!.id;
    this.assignmentListService.getAssignmentListByUserId(currentUserId!).subscribe(
      (lists: AssignmentListModel[]) => {
        this.listAssignmentList = lists;
        console.log('List of AssignmentLists:', this.listAssignmentList);

        // Chamada ao método ListAssignmentByAssignmentList para cada assignmentList
        for (let assignmentList of this.listAssignmentList) {
          //console.log(assignmentList.id);
          this.ListAssignmentByAssignmentList(assignmentList.id!);
        }
      },
      (error) => {
        console.error('Error loading assignment lists:', error);
      }
    );
  }

  ListAssignmentByAssignmentList(assignmentListId: number) {
    this.assignmentListService.ListAssignmentByAssignmentList(assignmentListId).subscribe(
      (assignments: AssignmentModel[]) => {
        this.assignmentMap[assignmentListId] = assignments;
        console.log('List of assignments for assignmentListId', assignmentListId, ':', assignments);
      },
      (error) => {
        console.error('Error loading assignments for assignmentListId', assignmentListId, ':', error);
      }
    );
  }


  toggleAssignmentListComponent(){
    this.showCreateAssignmentListForm = !this.showCreateAssignmentListForm
  }
}
