import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarListaComponent } from './modal-deletar-lista.component';

describe('ModalDeletarListaComponent', () => {
  let component: ModalDeletarListaComponent;
  let fixture: ComponentFixture<ModalDeletarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeletarListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeletarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
