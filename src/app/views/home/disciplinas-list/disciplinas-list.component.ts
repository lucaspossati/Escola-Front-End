import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/shared/model/disciplina.model';
import { DisciplinaService } from 'src/app/shared/service/disciplina.service';
import Swal from 'sweetalert2';
import { AccountService } from '../account/shared/account/account.service';

@Component({
  selector: 'app-disciplinas-list',
  templateUrl: './disciplinas-list.component.html',
  styleUrls: ['./disciplinas-list.component.css']
})
export class DisciplinasListComponent implements OnInit {

  disciplinas: Disciplina[];
  disciplina: any[];

  constructor(
    public disciplinaService: DisciplinaService,
    public accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.getDisciplinas();
  }

  getDisciplinas(){
    this.disciplinaService.getDisciplinasWithFlag('id').subscribe(data => {
      this.disciplinas = data;
      
    })
  }

  deletarDisciplinas(disciplinaId) {
    this.accountService.deletarDisciplinas(disciplinaId).subscribe(data => {

      if (data != null) {
        this.alertErroAoExcluir();
      }
      else {
        this.alertDisciplinaExcluida();
      }

    })
  }

  alertConfirmarDeleteDisciplina(disciplinaId, nomeDisciplina) {

    Swal.fire({
      title: 'Deseja realmente excluir a disciplina ' + nomeDisciplina + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deletarDisciplinas(disciplinaId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'A disciplina não foi excluida :)',
          'error'
        )
      }
    })
  }


  alertDisciplinaExcluida() {

    Swal.fire({
      title: 'Disciplina deletada com sucesso',
      icon: 'success',
      timer: 2000
    }).then((result) => {
      this.refresh();
    })
  }

  alertErroAoExcluir() {

    Swal.fire({
      title: 'Não foi possivel excluir a disciplina',
      icon: 'error',
      timer: 2000
    })
  }

  refresh(): void {
    window.location.reload();
  }
  

}
