import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-ajuda',
  imports: [ CommonModule],
  standalone: true,
  templateUrl: './modal-ajuda.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-ajuda.component.scss'
})
export class ModalAjudaComponent {

  constructor(private modalService: NgbModal) {}

  openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-gray-backdrop', size: 'xl' , centered: true});
	}


}
