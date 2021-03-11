import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/shared/model/disciplina.model';
import { DisciplinaService } from 'src/app/shared/service/disciplina.service';

@Component({
  selector: 'app-disciplinas-list',
  templateUrl: './disciplinas-list.component.html',
  styleUrls: ['./disciplinas-list.component.css']
})
export class DisciplinasListComponent implements OnInit {

  disciplinas: Disciplina[];

  constructor(
    public disciplinaService: DisciplinaService
  ) { }

  ngOnInit(): void {
    this.getDisciplinas();
  }

  getDisciplinas(){
    this.disciplinaService.getDisciplinasWithFlag('id').subscribe(data => {
      this.disciplinas = data;
      console.log(this.disciplinas);
    })
  }

}
