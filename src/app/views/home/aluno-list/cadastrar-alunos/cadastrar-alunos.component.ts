import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Aluno } from 'src/app/shared/model/aluno.model';
import { AlunoService } from 'src/app/shared/service/aluno.service';
import { AccountService } from '../../account/shared/account/account.service';

@Component({
  selector: 'app-cadastrar-alunos',
  templateUrl: './cadastrar-alunos.component.html',
  styleUrls: ['./cadastrar-alunos.component.css']
})
export class CadastrarAlunosComponent implements OnInit {
 
  alunos: any[];
  alunoSalvo: boolean;
  constructor(
    public alunoService: AlunoService,
    public accountService: AccountService
    ) { }
    
  aluno: any;

  ngOnInit(): void {
    this.aluno = {};
  }

  criarAlunos(){
    this.accountService.criarAlunos(this.aluno).subscribe(data => {
      
      console.log("Data:"+data);
      
      if(data == "Salvo com sucesso"){
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
      }

      })

      
  }

  getAlunosbyID(){
    this.accountService.getAlunobyID(this.aluno).subscribe(data => {
      
      console.log("Data:"+data);
      

      })
  }
  
  
  
}
