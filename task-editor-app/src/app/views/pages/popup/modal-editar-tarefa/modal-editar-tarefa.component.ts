import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-editar-tarefa',
  imports: [ CommonModule, FormsModule],
  standalone: true,
  templateUrl: './modal-editar-tarefa.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-editar-tarefa.component.scss'
})
export class ModalEditarTarefaComponent {

  @Input() assignment!: any;

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService) {}

  openBackDropCustomClass(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    modalRef.result.then(() => {
      // A modal foi fechada
      this.restoreValues();
    }, () => {
      // A modal foi fechada
      this.restoreValues();
    });
  }

  updateAssignment() {
    this.assignmentListService.updateAssignment(this.assignment).subscribe(
      (response) => {
        console.log("Tarefa atualizado com sucesso!");
        window.location.reload();
      },
      (error) => {
        console.error("Erro ao atualizar tarefa:", error);
        console.log(this.assignment);
      }
    );
  }

  restoreValues()
  {
    window.location.reload();
  }
}
