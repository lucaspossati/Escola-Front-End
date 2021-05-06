import { Disciplina } from 'src/app/shared/model/disciplina.model';
import { Biblioteca } from './../../../../../shared/model/biblioteca.model';
import { Aluno } from './../../../../../shared/model/aluno.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlunoLogin } from '../../login/login.model';
import { catchError } from 'rxjs/operators';
import Swal, { SweetAlertArrayOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  Login(login: AlunoLogin): Observable<any> {
    return this.http.post<any>(environment.api + "/api/alunoss/login", login);
  }

  gerarToken(login: AlunoLogin): Observable<any> {

    let headers = new HttpHeaders();
        headers = headers.append("Content-Type", 'application/x-www-form-urlencoded');
        headers = headers.append("Access-Control-Allow-Origin", '*');
        headers = headers.append('Access-Control-Allow-Credentials', 'true');

        var creds = 'username=' + login.login + '&password=' + login.senha + "&grant_type=password" + "&credentials=true";
        
    return this.http.post<any>(environment.api + "/token", creds, { headers: headers });

  }

  //Alunos
  alunosUrl = 'https://localhost:44311/api/alunoss/aluno';
  alunosID = 'https://localhost:44311/api/alunoss/getAlunosbyID/';
  urlDeletaAlunos = 'https://localhost:44311/api/alunoss/deletarAluno/';

  //Livros
  livrosUrl = 'https://localhost:44311/api/biblioteca/biblioteca';
  livroID = 'https://localhost:44311/api/biblioteca/getLivrosbyID/';
  urlDeletaLivro = 'https://localhost:44311/api/biblioteca/deletarBiblioteca/';

  //Disciplina
  disciplinaUrl = 'https://localhost:44311/api/disciplinas/disciplinas';
  disciplinaId = 'https://localhost:44311/api/disciplinas/getDisciplinasbyID/';
  urlDeletaDisciplina = 'https://localhost:44311/api/disciplinas/deletarDisciplina/';

  //Serviço seta Objeto do usuario logado
  setarObjUsuarioLogado(Usuario) {
    sessionStorage.setItem("UsuarioLogadoObj-EstudosLucas", Usuario);
  }

  //Serviço retorna obj com usuario logado
  ObjUsuarioLogado(): any {
    return JSON.parse(sessionStorage.getItem("UsuarioLogadoObj-EstudosLucas"));
  } 

  //New

  criarAlunos(aluno:any){
    return this.http.post(this.alunosUrl, aluno);
  }

  criarLivros(livro:any){
    return this.http.post(this.livrosUrl, livro);
  }

  criarDisciplinas(livro:any){
    return this.http.post(this.disciplinaUrl, livro);
  }

  //Gets

  getAlunobyID(disciplinaId: any){
    return this.http.get<Aluno>(this.disciplinaId + disciplinaId);
  }

  getLivrobyID(livroId: any){
    return this.http.get<Biblioteca>(this.livroID + livroId);
  }

  getDisciplinabyID(livroId: any){
    return this.http.get<Disciplina>(this.livroID + livroId);
  }

  //Delete

  deletarAlunos(alunoId: any){
    return this.http.delete(this.urlDeletaAlunos+ alunoId);
  }

  deletarLivros(livroId: any){
    return this.http.delete(this.urlDeletaLivro + livroId);
  }

  deletarDisciplinas(disciplinaId: any){
    return this.http.delete(this.urlDeletaDisciplina + disciplinaId);
  }

  //Serviço remove os parametros de usuário logado
  deslogar() {
    // sessionStorage.setItem("Token-MRA", null);    
    sessionStorage.setItem("UsuarioLogadoObj-EstudosLucas", null);  
    sessionStorage.setItem("token-access", null);    
  }

  

  // async login(login: any) {
    
  //   const result = await this.http.post<any>(`${environment.api}/api/alunoss/login`, login).toPromise();

  //   if (result && result.access_token){
  //     window.localStorage.setItem('token', 'meu-token');
  //     return true;
  //   }
    
  //   return false;
  //   console.log(result);
    
  // }


}
