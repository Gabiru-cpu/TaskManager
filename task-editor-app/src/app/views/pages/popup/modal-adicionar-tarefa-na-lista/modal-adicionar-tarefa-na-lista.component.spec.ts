import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionarTarefaNaListaComponent } from './modal-adicionar-tarefa-na-lista.component';

describe('ModalAdicionarTarefaNaListaComponent', () => {
  let component: ModalAdicionarTarefaNaListaComponent;
  let fixture: ComponentFixture<ModalAdicionarTarefaNaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdicionarTarefaNaListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAdicionarTarefaNaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
