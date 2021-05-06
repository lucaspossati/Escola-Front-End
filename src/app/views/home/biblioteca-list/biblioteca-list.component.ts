import { Component, OnInit } from '@angular/core';
import { Biblioteca } from 'src/app/shared/model/biblioteca.model';
import { BibliotecaService } from 'src/app/shared/service/biblioteca.service';
import Swal from 'sweetalert2';
import { AccountService } from '../account/shared/account/account.service';

@Component({
  selector: 'app-biblioteca-list',
  templateUrl: './biblioteca-list.component.html',
  styleUrls: ['./biblioteca-list.component.css']
})
export class BibliotecaListComponent implements OnInit {

  biblioteca!: Biblioteca[];

  constructor(
    public bibliotecaService: BibliotecaService,
    public accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.getBiblioteca();
  }

  getBiblioteca(){
    this.bibliotecaService.getBibliotecaWithFlag('id').subscribe(data => {
      this.biblioteca = data;
      console.log(this.biblioteca);
    })
  }

  deletarBibliotecas(bibliotecaId) {
    this.accountService.deletarLivros(bibliotecaId).subscribe(data => {

      if (data != null) {
        this.alertErroAoExcluir();
      }
      else {
        this.alertLivroExcluido();
      }

    })
  }

  alertConfirmarDeleteBiblioteca(bibliotecaId, nomeLivro) {

    Swal.fire({
      title: 'Deseja realmente excluir o livro ' + nomeLivro + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.deletarBibliotecas(bibliotecaId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seu livro não foi excluido :)',
          'error'
        )
      }
    })
  }


  alertLivroExcluido() {

    Swal.fire({
      title: 'Livro deletado com sucesso',
      icon: 'success',
      timer: 2000
     });
    
  }

  alertErroAoExcluir() {

    Swal.fire({
      title: 'Não foi possivel excluir o livro',
      icon: 'error',
      timer: 2000
    })
  }

  refresh(): void {
    window.location.reload();
  }

}
