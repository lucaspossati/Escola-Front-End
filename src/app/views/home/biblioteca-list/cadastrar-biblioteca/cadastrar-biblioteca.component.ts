import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BibliotecaService } from 'src/app/shared/service/biblioteca.service';
import { AccountService } from '../../account/shared/account/account.service';

@Component({
  selector: 'app-cadastrar-biblioteca',
  templateUrl: './cadastrar-biblioteca.component.html',
  styleUrls: ['./cadastrar-biblioteca.component.css']
})
export class CadastrarBibliotecaComponent implements OnInit {

  closeResult = '';
  livros: any[];
  livroSalvo: boolean;
  livro: any;

  constructor(
    public bibliotecaService: BibliotecaService,
    public accountService: AccountService,
    private modalService: NgbModal,) { 
    
  }

  ngOnInit(): void {
    this.livro = {};
  }

  criarBiblioteca(){
    this.accountService.criarLivros(this.livro).subscribe(data => {

 
      if(data == "Salvo com sucesso"){
        this.alertLivroSalvo();
        this.livroSalvo = true;
        this.livro.Id
        this.livro.AlunoId = '';
        this.livro.NomeLivro = '';
        this.livro.AnoLancamento = '';
        this.livro.Genero = '';
        this.livro.RA = '';

      }
      else{
        this.livroSalvo = false;
        this.alertErroSalvarLivro();
      }

      })    
  }

  getLivrobyID(livroId){
    this.accountService.getLivrobyID(livroId).subscribe(data => {
      
      if(data != null){

        this.livro.Id = data.Id
        this.livro.AlunoID = data.AlunoID;
        this.livro.NomeLivro = data.NomeLivro;
        this.livro.AnoLancamento = data.AnoLancamento;
        this.livro.Genero = data.Genero;
        this.livro.RA = data.RA;
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
