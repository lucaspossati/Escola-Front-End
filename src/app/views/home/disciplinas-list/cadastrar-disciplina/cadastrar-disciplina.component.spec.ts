import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDisciplinaComponent } from './cadastrar-disciplina.component';

describe('CadastrarDisciplinaComponent', () => {
  let component: CadastrarDisciplinaComponent;
  let fixture: ComponentFixture<CadastrarDisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarDisciplinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
