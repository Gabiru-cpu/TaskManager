import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-deletar-lista',
  imports: [ CommonModule, FormsModule],
  standalone: true,
  templateUrl: './modal-deletar-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-deletar-lista.component.scss'
})
export class ModalDeletarListaComponent {

  @Input() assignmentListId!: number;

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService) {}

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-red-backdrop' });
	}

  deleteAssignmentList() {
    this.assignmentListService.deleteAssignmentList(this.assignmentListId).subscribe(
        () => {
            console.log("Lista de tarefas deletada com sucesso!");
            window.location.reload();
        },
        (error) => {
            console.error("Erro ao deletar a lista de tarefas:", error);
            console.log(this.assignmentListId);
        }
    );
}

}
