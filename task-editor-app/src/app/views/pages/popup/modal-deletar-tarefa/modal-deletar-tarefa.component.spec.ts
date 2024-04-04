import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarTarefaComponent } from './modal-deletar-tarefa.component';

describe('ModalDeletarTarefaComponent', () => {
  let component: ModalDeletarTarefaComponent;
  let fixture: ComponentFixture<ModalDeletarTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeletarTarefaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeletarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
