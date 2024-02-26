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

  async listAssignmentVisible(e: any){
    let currentId: number
    let currentName: string
    if(e.target.id === "assignmentListButton"){
      currentId = e.target.children[2].innerHTML
      currentName = e.target.children[1].innerHTML
    }else{
      currentId  = e.target.parentElement.children[2].innerHTML
      currentName = e.target.parentElement.children[1].innerHTML
    }

    this.getListAssignment(currentId, (currentList: AssignmentModel[], currentError: string)=>{
      
      this.parentComponent.showListAssignment(currentList, currentError, currentName, currentId)
    })
    
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
    const currentUserId = currentUser!.userId;
  
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
}
