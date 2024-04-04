import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-popup',
  standalone: true,
	templateUrl: './popup.component.html',
	encapsulation: ViewEncapsulation.None,
  styleUrl: './popup.component.scss',
})
export class PopupComponent {

	private modalService = inject(NgbModal);

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}
}
