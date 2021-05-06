import { Aluno } from './../../../../shared/model/aluno.model';
import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlunoService } from 'src/app/shared/service/aluno.service';
import { AccountService } from '../../account/shared/account/account.service';
import Swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cadastrar-alunos',
  templateUrl: './cadastrar-alunos.component.html',
  styleUrls: ['./cadastrar-alunos.component.css']
})
export class CadastrarAlunosComponent implements OnInit {

  closeResult = '';
  alunos: any[];
  alunoSalvo: boolean;
  aluno: any;

  constructor(
    public alunoService: AlunoService,
    public accountService: AccountService,
    private modalService: NgbModal,
    ) { }
 

  ngOnInit(): void {
    this.aluno = {};
   
   
  }

  criarAlunos(){
    this.accountService.criarAlunos(this.aluno).subscribe(data => {

      
      if(data == "Salvo com sucesso"){
        this.alertAlunoSalvo();
        this.alunoSalvo = true;
        this.aluno.Id = '';
        this.aluno.Nome = '';
        this.aluno.DatadeNascimento = '';
        this.aluno.RA = '';
        this.aluno.Curso = '';
        this.aluno.Semestre = '';
        this.aluno.Login = '';
        this.aluno.Senha = '';

      }
      else{
        this.alunoSalvo = false;
        this.alertErroSalvarAluno();
      }

      })

      
  }

  getAlunosbyID(alunoId){
    this.accountService.getAlunobyID(alunoId).subscribe(data => {
      

      if(data != null){
        
        this.aluno.Nome = data.Nome;
        this.aluno.DatadeNascimento = data.DatadeNascimento;
        this.aluno.RA = data.RA;
        this.aluno.Curso = data.Curso;
        this.aluno.Semestre = data.Semestre;
        this.aluno.Login = data.Login;
        this.aluno.Senha = data.Senha;
      }
      else{
        this.alertAlunoNaoEncontrado();
      }

      })
  }

  alertAlunoSalvo(){
    
    Swal.fire({
      title: 'Aluno savo com sucesso',
      icon: 'success',
      confirmButtonText: 'Fechar',     
    }).then ((result) => {
      this.refresh();
    })
  }

  alertErroSalvarAluno(){
    
    Swal.fire({
      title: 'Não foi possivel cadastrar o aluno',
      icon: 'error',
      confirmButtonText: 'Fechar',     
    })
  }

  alertAlunoNaoEncontrado(){
    
    Swal.fire({
      title: 'O aluno não foi encontrado',
      text: 'Tente pesquisar outro aluno(ID)',
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
