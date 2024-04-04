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
import { PopupComponent } from '../popup/popup.component';
import { ModalEditarNomeListaComponent } from '../popup/modal-editar-nome-lista/modal-editar-nome-lista.component';
import { ModalEditarTarefaComponent } from '../popup/modal-editar-tarefa/modal-editar-tarefa.component';
import { ModalAdicionarTarefaNaListaComponent } from '../popup/modal-adicionar-tarefa-na-lista/modal-adicionar-tarefa-na-lista.component';
import { ModalDeletarListaComponent } from '../popup/modal-deletar-lista/modal-deletar-lista.component';
import { ModalDeletarTarefaComponent } from '../popup/modal-deletar-tarefa/modal-deletar-tarefa.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [TaskListSidebarComponent, TaskListHeaderComponent, TaskListCreateFormComponent, TaskContainerComponent,
    ModalEditarNomeListaComponent, ModalEditarTarefaComponent, ModalAdicionarTarefaNaListaComponent, ModalDeletarListaComponent, ModalDeletarTarefaComponent,
    CommonModule, FormsModule],
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

  updateAssignmentStatus(assignmentId: number) {
    this.assignmentListService.updateAssignmentStatus(assignmentId).subscribe(
      (response) => {
        console.log('Assignment status updated successfully:');
        window.location.reload();
      },
      (error) => {
        console.error('Error updating assignment status:', error);
      }
    );
  }

  toggleAssignmentListComponent(){
    this.showCreateAssignmentListForm = !this.showCreateAssignmentListForm
  }

}
