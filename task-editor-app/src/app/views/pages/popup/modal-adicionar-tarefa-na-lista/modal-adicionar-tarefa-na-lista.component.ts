import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-adicionar-tarefa-na-lista',
  imports: [ CommonModule, FormsModule],
  standalone: true,
  templateUrl: './modal-adicionar-tarefa-na-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-adicionar-tarefa-na-lista.component.scss'
})
export class ModalAdicionarTarefaNaListaComponent {

  @Input() assignmentListId!: number;
  newAssignment: any = {};

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService) {}

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-green-backdrop' });

	}

  createAssignment() {
    this.newAssignment.assignmentListId = this.assignmentListId;
    this.assignmentListService.createAssignment(this.newAssignment).subscribe(
      (response) => {
        console.log("Tarefa criada com sucesso!");
        window.location.reload();
      },
      (error) => {
        console.error("Erro ao criar tarefa:", error);
        console.log(this.newAssignment);
      }
    );
  }
}
