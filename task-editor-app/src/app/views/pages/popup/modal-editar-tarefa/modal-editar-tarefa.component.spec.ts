import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarTarefaComponent } from './modal-editar-tarefa.component';

describe('ModalEditarTarefaComponent', () => {
  let component: ModalEditarTarefaComponent;
  let fixture: ComponentFixture<ModalEditarTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarTarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
