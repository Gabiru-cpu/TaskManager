import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjudaComponent } from './modal-ajuda.component';

describe('ModalAjudaComponent', () => {
  let component: ModalAjudaComponent;
  let fixture: ComponentFixture<ModalAjudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAjudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
