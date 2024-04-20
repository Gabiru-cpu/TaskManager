import { Component, Input, TemplateRef, ViewEncapsulation, Inject, LOCALE_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { GoogleMapsService } from '../../../../shared/services/google-maps.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-modal-editar-tarefa',
  imports: [ CommonModule, FormsModule, GoogleMapsModule],
  standalone: true,
  templateUrl: './modal-editar-tarefa.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-editar-tarefa.component.scss'
})
export class ModalEditarTarefaComponent {

  @Input() assignment!: any;

  selectedLocation: google.maps.LatLngLiteral | undefined;

  mapConfigurations = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
  };

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit() {
    if (this.assignment) {
      if (this.assignment.latitude && this.assignment.longitude) {
        this.selectedLocation = {
          lat: this.assignment.latitude,
          lng: this.assignment.longitude
        };
      }
      if (this.assignment.dueDate) {
        this.assignment.dueDate = formatDate(this.assignment.dueDate, 'yyyy-MM-dd', this.locale);
      }
    }
  }

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
    if (this.selectedLocation) {
      this.assignment.latitude = this.selectedLocation.lat;
      this.assignment.longitude = this.selectedLocation.lng;
    }
    //this.assignment.address = "";

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

  mapClicked(event: google.maps.MapMouseEvent) {
    this.selectedLocation = event.latLng!.toJSON();
    console.log("Local selecionado:", this.selectedLocation);
    console.log("Local selecionado:", JSON.stringify(this.selectedLocation));
  }

}
