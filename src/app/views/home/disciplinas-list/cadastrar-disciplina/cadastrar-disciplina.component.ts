import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BibliotecaService } from 'src/app/shared/service/biblioteca.service';
import { AccountService } from '../../account/shared/account/account.service';

@Component({
  selector: 'app-cadastrar-disciplina',
  templateUrl: './cadastrar-disciplina.component.html',
  styleUrls: ['./cadastrar-disciplina.component.css']
})
export class CadastrarDisciplinaComponent implements OnInit {

  closeResult = '';
  disciplinas: any[];
  disciplinaSalvo: boolean;
  disciplina: any;

  constructor(
    public bibliotecaService: BibliotecaService,
    public accountService: AccountService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.disciplina = {};
  }

  criarDisciplina(){
    this.accountService.criarDisciplinas(this.disciplina).subscribe(data => {

 
      if(data == "Salvo com sucesso"){
        this.alertLivroSalvo();
        this.disciplinaSalvo = true;
        this.disciplina.Id
        this.disciplina.NomeDisciplina = '';
        this.disciplina.NomeProfessor = '';
        this.disciplina.Ementa = '';
        this.disciplina.Curso = '';
        this.disciplina.Periodo = '';

      }
      else{
        this.disciplinaSalvo = false;
        this.alertErroSalvarLivro();
      }

      })    
  }

  getDisciplinabyID(disciplinaId){
    this.accountService.getDisciplinabyID(disciplinaId).subscribe(data => {

      console.log(data);
      
      if(data != null){

        this.disciplina.Id
        this.disciplina.NomeDisciplina = data.NomeDisciplina;
        this.disciplina.NomeProfessor = data.NomeProfessor;
        this.disciplina.Ementa = data.Ementa;
        this.disciplina.Curso = data.Curso;
        this.disciplina.Periodo = data.Periodo;
      }
      else{
        this.alertLivroNaoEncontrado();
      }

      })
  }

  alertLivroSalvo(){
    
    Swal.fire({
      title: 'Livro savo com sucesso',
      icon: 'success',
      confirmButtonText: 'Fechar',     
    }).then ((result) => {
      this.refresh();
    })
  }

  alertErroSalvarLivro(){
    
    Swal.fire({
      title: 'Não foi possivel cadastrar o livro',
      icon: 'error',
      confirmButtonText: 'Fechar',     
    })
  }

  alertLivroNaoEncontrado(){
    
    Swal.fire({
      title: 'O livro não foi encontrado',
      text: 'Tente pesquisar outro livro com ID diferente.',
      icon: 'warning',
      confirmButtonText: 'Fechar',     
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  refresh(): void {
    window.location.reload();
  }

}
