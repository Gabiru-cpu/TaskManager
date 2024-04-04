import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-deletar-tarefa',
  imports: [ CommonModule, FormsModule],
  standalone: true,
  templateUrl: './modal-deletar-tarefa.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-deletar-tarefa.component.scss'
})
export class ModalDeletarTarefaComponent {

  @Input() assignmentId!: number;

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService) {}

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-red-backdrop' });
	}

    deleteAssignmentById() {
      this.assignmentListService.deleteAssignmentById(this.assignmentId).subscribe(
          () => {
              console.log("Tarefa deletada com sucesso!");
              window.location.reload();
          },
          (error) => {
              console.error("Erro ao deletar a tarefa:", error);
              console.log(this.assignmentId);
          }
      );
  }

}
