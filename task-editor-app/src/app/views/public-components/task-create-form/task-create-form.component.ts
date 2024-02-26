import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentService } from '../../../shared/services/assignment.service';
import { NewAssignmentModel } from '../../../shared/models/newAssignment.model';
import { first } from 'rxjs';
import { TaskContainerComponent } from '../task-container/task-container.component';

@Component({
  selector: 'app-task-create-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-create-form.component.html',
  styleUrl: './task-create-form.component.scss'
})
export class TaskCreateFormComponent {
  createAssignmentForm: FormGroup;
  creationError: string = "";

  @Input() currentAssignmentListId!: number;

  constructor(private formBuilder: FormBuilder, private assignmentService: AssignmentService, private parentComponent: TaskContainerComponent) {
    this.createAssignmentForm = this.formBuilder.group({
      inputTitle:['', Validators.required],
      inputDescription:[''],
      inputDueDate:['',Validators.required]
    })
  }

  createAssignmentSubmit(){
    const newAssignment: NewAssignmentModel = new NewAssignmentModel;
    newAssignment.title = this.createAssignmentForm.controls['inputTitle'].value;
    newAssignment.description = this.createAssignmentForm.controls['inputDescription'].value;
    newAssignment.dueDate = this.createAssignmentForm.controls['inputDueDate'].value;
    newAssignment.assignmentListId = this.currentAssignmentListId;

    this.assignmentService.createAssignment(newAssignment).pipe(first()).subscribe({
      next: (res) => {
        console.log(res)
        this.parentComponent.listAssignmentSignal.update(lst => {
          if( lst != null)
            lst.push(res);
          return lst
        })
      },
      error: error => {
        if(typeof error.error === 'string' ){
          this.creationError = (error.error)
        }else{
          this.creationError = ('Date is an obligatory field')
        }
        
      }
    }) 
  }

}
