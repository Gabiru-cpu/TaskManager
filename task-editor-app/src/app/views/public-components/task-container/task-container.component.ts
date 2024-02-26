import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, computed, signal } from '@angular/core';
import { AssignmentModel } from '../../../shared/models/assignment.model';
import { TaskListSidebarComponent } from '../task-list-sidebar/task-list-sidebar.component';
import { CommonModule } from '@angular/common';
import { AssignmentLoaderService } from '../../../shared/services/assignment-loader.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Router } from '@angular/router';
import { TaskCreateFormComponent } from '../task-create-form/task-create-form.component';

@Component({
  selector: 'app-task-container',
  standalone: true,
  imports: [TaskListSidebarComponent, CommonModule, TaskCardComponent, TaskCreateFormComponent],
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.scss'
})
export class TaskContainerComponent implements OnChanges {

  constructor( private elementRef: ElementRef<HTMLElement> ) {
    
  }

  showCreationForm: boolean = false;

  @Input({required: true}) listAssignment!: AssignmentModel[];
  @Input({required: true}) currentErrorMessage!: string;
  @Input({required: true}) listTitle!: string;
  @Input({required: true}) listId!: number;

  public listAssignmentSignal = signal<AssignmentModel[] | null>( null )
  protected listAssignmentComputed = computed<AssignmentModel[] | null>(() => this.listAssignmentSignal());

  ngOnChanges(): void {
    this.listAssignmentSignal.set(this.listAssignment)
  }

  toggleCollapse(){
    this.showCreationForm = !this.showCreationForm
  }

}