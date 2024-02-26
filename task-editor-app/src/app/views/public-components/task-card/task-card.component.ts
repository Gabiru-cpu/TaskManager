import { Component, HostListener, Input, OnChanges, OnInit, assertNotInReactiveContext, signal } from '@angular/core';
import { AssignmentModel } from '../../../shared/models/assignment.model';
import { AssignmentService } from '../../../shared/services/assignment.service';
import { first } from 'rxjs';
import { TaskContainerComponent } from '../task-container/task-container.component';
import { DatePipe, Time } from '@angular/common';
import { HoverDangerDirective } from '../../../shared/directives/hover-danger/hover-danger.directive';
import { TaskDeleteConfirmationModalComponent } from '../task-delete-confirmation-modal/task-delete-confirmation-modal.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe, HoverDangerDirective, TaskDeleteConfirmationModalComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent implements OnChanges{
  
  title: string | undefined;
  description: string | undefined;
  isCompleted: boolean | undefined;
  dueDate!: Date;
  assignmentId: number | undefined;
  datePassed: boolean | undefined;
  showConfirmationModal: boolean = false;

  constructor(private assignmentService: AssignmentService, public parentComponent: TaskContainerComponent) {
  }

  ngOnChanges (): void {
    this.title = this.assignment.title;
    this.description = this.assignment.description;
    this.isCompleted = this.assignment.isCompleted;
    this.assignmentId = this.assignment.id;
    this.dueDate = new Date(this.assignment.dueDate!);
    const today = new Date()
    if(this.dueDate != undefined) this.datePassed = (today.getTime() < new Date(this.dueDate).getTime());
  }

  @Input() assignment!: AssignmentModel;

  confirmDeleteAssignment() {
    this.showConfirmationModal = !this.showConfirmationModal
  }

  deleteAssignment(){
    if (this.assignmentId != undefined){
      this.assignmentService.deleteAssignment(this.assignmentId).pipe(first()).subscribe({
        next: (res) => {
          this.parentComponent.listAssignmentSignal.update(lst => {
            if(lst != null){
              let deleteId: number | undefined = undefined
              let currId = 0
              lst.forEach(itm =>{
                if(itm.id == this.assignmentId){
                  deleteId = currId;
                }
                currId++
              })
              if(deleteId != undefined)
                lst.splice(deleteId, 1);
            }
            return lst
          })
        },
        error: error => {
          console.log(error.error)
        }
      }) 

    }
  }

  updateCurrentAssignmentStatus() {    
    this.assignmentService.updateAssignmentStatus(this.assignmentId!).pipe(first()).subscribe({
      next: (res) =>{
        this.parentComponent.listAssignmentSignal.update(lst => {
          if(lst != null){
            let id = res.id
            lst.forEach(itm => {
              if (itm.id == id) {
                itm.isCompleted = !itm.isCompleted
              }
            })
          }
          return lst
        })
      },
      error: error => {
        console.log(error.error)
      }
    })
  }
  
}
