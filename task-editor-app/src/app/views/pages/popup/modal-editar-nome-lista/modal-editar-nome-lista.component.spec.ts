import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarNomeListaComponent } from './modal-editar-nome-lista.component';

describe('ModalEditarNomeListaComponent', () => {
  let component: ModalEditarNomeListaComponent;
  let fixture: ComponentFixture<ModalEditarNomeListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarNomeListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarNomeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
