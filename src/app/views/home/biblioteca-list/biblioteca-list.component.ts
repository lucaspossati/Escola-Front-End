import { Component, OnInit } from '@angular/core';
import { Biblioteca } from 'src/app/shared/model/biblioteca.model';
import { BibliotecaService } from 'src/app/shared/service/biblioteca.service';

@Component({
  selector: 'app-biblioteca-list',
  templateUrl: './biblioteca-list.component.html',
  styleUrls: ['./biblioteca-list.component.css']
})
export class BibliotecaListComponent implements OnInit {

  biblioteca!: Biblioteca[];

  constructor(
    public bibliotecaService: BibliotecaService
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

}
