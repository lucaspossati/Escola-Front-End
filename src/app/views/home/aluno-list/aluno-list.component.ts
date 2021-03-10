import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/shared/model/aluno.model';
import { AlunoService } from 'src/app/shared/service/aluno.service';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {

  alunos!: Aluno[];

  constructor(
    public alunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.getAlunos();
  }

  getAlunos(){
    this.alunoService.getAlunosWithFlag('id').subscribe(data => {
      this.alunos = data;
      console.log(this.alunos);
    })
  }

}
