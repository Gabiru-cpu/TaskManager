import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentListService } from '../../../../shared/services/assignment-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsService } from '../../../../shared/services/google-maps.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-modal-adicionar-tarefa-na-lista',
  imports: [ CommonModule, FormsModule, GoogleMapsModule],
  standalone: true,
  templateUrl: './modal-adicionar-tarefa-na-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './modal-adicionar-tarefa-na-lista.component.scss'
})
export class ModalAdicionarTarefaNaListaComponent {

  @Input() assignmentListId!: number;
  newAssignment: any = {};

  selectedLocation: google.maps.LatLngLiteral | undefined;

  initialCoordinates = {
    lat: -23.974059611630224,
    lng: -46.309533884593435,
  };
  mapConfigurations = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
  };

  constructor(private modalService: NgbModal, private assignmentListService: AssignmentListService, private googleMapsService: GoogleMapsService) {}

  mapClicked(event: google.maps.MapMouseEvent) {
    this.selectedLocation = event.latLng!.toJSON();
    console.log("Local selecionado:", this.selectedLocation);
    console.log("Local selecionado:", JSON.stringify(this.selectedLocation));
  }

	openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-green-backdrop' });
	}

  createAssignment() {
    if (this.selectedLocation) {
      this.newAssignment.latitude = this.selectedLocation.lat;
      this.newAssignment.longitude = this.selectedLocation.lng;
    }

    this.newAssignment.assignmentListId = this.assignmentListId;
    this.newAssignment.address = "";
    console.log("this.newAssignment: " + JSON.stringify(this.newAssignment) );
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
