import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarBibliotecaComponent } from './cadastrar-biblioteca.component';

describe('CadastrarBibliotecaComponent', () => {
  let component: CadastrarBibliotecaComponent;
  let fixture: ComponentFixture<CadastrarBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarBibliotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
