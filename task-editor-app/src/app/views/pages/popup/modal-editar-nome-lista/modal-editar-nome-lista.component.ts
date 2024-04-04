import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-editar-nome-lista',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './modal-editar-nome-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-editar-nome-lista.component.scss'
})
export class ModalEditarNomeListaComponent {

  @Input() assignmentListId!: number;
  @Input() assignmentListName!: string;

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService) {}

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}


  updateAssignmentListName() {
    this.assignmentListService.updateAssignmentListName(this.assignmentListId, this.assignmentListName).subscribe(
        (response) => {
            console.log("Nome da lista atualizado com sucesso!");
            window.location.reload();
        },
        (error) => {
            console.error("Erro ao atualizar o nome da lista:", error);
        }
    );
}

}

