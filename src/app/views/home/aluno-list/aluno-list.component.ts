import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/shared/model/aluno.model';
import { AlunoService } from 'src/app/shared/service/aluno.service';
import Swal from 'sweetalert2';
import { AccountService } from '../account/shared/account/account.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  closeResult = '';
  alunos!: Aluno[];
  aluno: any;

  alunoSelecionado: Aluno;

  constructor(
    public alunoService: AlunoService,
    public accountService: AccountService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getAlunos();
  }

  getIndex() {

  }

  getAlunos() {
    this.alunoService.getAlunosWithFlag('id').subscribe(data => {
      this.alunos = data;
    })
  }

  deletarAlunos(alunoId) {
    this.accountService.deletarAlunos(alunoId).subscribe(data => {

      if (data != null) {
        this.alertErroAoExcluir();
      }
      else {
        this.alertAlunoExcluido();
      }

    })
  }

  alertConfirmarDeleteAluno(alunoId, nomeAluno) {

    Swal.fire({
      title: 'Deseja realmente excluir o aluno ' + nomeAluno + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deletarAlunos(alunoId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seu aluno não foi excluido :)',
          'error'
        )
      }
    })
  }


  alertAlunoExcluido() {

    Swal.fire({
      title: 'Aluno deletado com sucesso',
      icon: 'success',
      timer: 2000
    }).then((result) => {
      this.refresh();
    })
  }

  alertErroAoExcluir() {

    Swal.fire({
      title: 'Não foi possivel excluir o aluno',
      icon: 'error',
      confirmButtonText: 'Fechar',
    })
  }

  refresh(): void {
    window.location.reload();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

}
