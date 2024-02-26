import { Component, Input } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { AssignmentService } from '../../../shared/services/assignment.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-task-delete-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './task-delete-confirmation-modal.component.html',
  styleUrl: './task-delete-confirmation-modal.component.scss'
})
export class TaskDeleteConfirmationModalComponent {

  @Input() assignmentId: number | undefined;
  @Input() assignmentTitle: string | undefined;

  constructor(private parentComponent: TaskCardComponent, private assignmentService: AssignmentService) {}

  disableModal(){
    this.parentComponent.confirmDeleteAssignment()
  }

  deleteAssignment(){
    this.parentComponent.deleteAssignment();
  }
}
