import { Component, OnInit } from '@angular/core';
import { AuthDataModel } from '../../../shared/models/authData.model';
import { AuthService } from '../../../shared/services/auth.service';
import { AssignmentListService } from '../../../shared/services/assignment-list.service';
import { AssignmentListModel } from '../../../shared/models/assignmentList.model';
import { first } from 'rxjs';
import { TaskDashboardComponent } from '../../pages/task-dashboard/task-dashboard.component';
import { AssignmentService } from '../../../shared/services/assignment.service';
import { AssignmentModel } from '../../../shared/models/assignment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './task-list-sidebar.component.html',
  styleUrl: './task-list-sidebar.component.scss'
})
export class TaskListSidebarComponent implements OnInit {

  listAssignmentList: AssignmentListModel[] = [];
  listAssignment: AssignmentModel[] = [];

  constructor( private authService: AuthService, private assignmentListService: AssignmentListService, private parentComponent: TaskDashboardComponent, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.getListAssignmentList()
  }

  createPostAssignmentListForm(){
    this.parentComponent.toggleAssignmentListComponent()
  }

  getListAssignment(assignmentListId: number, callBack: any){
    this.assignmentService.listAssignmentByAssignmentListId(assignmentListId).pipe(first()).subscribe({
      next: (res) => {
        this.listAssignment = res
        callBack(this.listAssignment, undefined)
      },
      error: error => {
        console.log(error)
        callBack(undefined, error.error)
      }
    })
  }

  getListAssignmentList(){
    const currentUser = this.authService.currentUserValue!.currentUser;
    const currentUserId = currentUser!.id;

    if(currentUserId != null && currentUserId != undefined){
      this.assignmentListService.getAssignmentListByUserId(currentUserId).pipe(first()).subscribe({
        next: (res) => {
          this.listAssignmentList = res
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  postLogout() {
    this.authService.postLogout();
  };
}
