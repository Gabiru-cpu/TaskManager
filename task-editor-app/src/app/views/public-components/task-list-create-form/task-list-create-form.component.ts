import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentListService } from '../../../shared/services/assignment-list.service';
import { AssignmentListModel } from '../../../shared/models/assignmentList.model';
import { NewAssignmentListModel } from '../../../shared/models/newAssignmentList.model';
import { AuthService } from '../../../shared/services/auth.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { HoverSuccessDirective } from '../../../shared/directives/hover-success/hover-success.directive';

@Component({
  selector: 'app-task-list-create-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HoverSuccessDirective],
  templateUrl: './task-list-create-form.component.html',
  styleUrl: './task-list-create-form.component.scss'
})
export class TaskListCreateFormComponent {
  newAssignmentListData: NewAssignmentListModel = new NewAssignmentListModel;
  createAssignmentListForm: FormGroup;
  newAssignmentListError: boolean = false;
  errorName: string = "";
  
  constructor(private router: Router, private formBuilder: FormBuilder, private assignmentListService: AssignmentListService, private authService: AuthService) {
    this.createAssignmentListForm = this.formBuilder.group({
      inputName:['', Validators.required]
    })
  }

  createAssignmentListSubmit(){
    this.newAssignmentListData.name = this.createAssignmentListForm.controls['inputName'].value
    
    let currentUserId = this.authService.currentUserValue!.currentUser!.userId
    if(currentUserId != undefined && currentUserId != null){
      this.newAssignmentListData.userId = currentUserId
      this.postCreateAssignmentList(this.newAssignmentListData)
    }

  }

  postCreateAssignmentList(creationData: NewAssignmentListModel){
    this.assignmentListService.postCreateAssignmentList(creationData).pipe(first()).subscribe({
      next: (res) => {
        console.log('teste')
        location.reload()
      },
      error: error => {
        this.errorName = (error.error)
      }
    }) 
  }

}
