import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlunoLogin } from '../../login/login.model';

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

  alunosUrl = 'https://localhost:44311/api/alunoss/aluno';
  alunosID = 'https://localhost:44311/api/alunoss/getAlunosbyID';

  //Serviço seta Objeto do usuario logado
  setarObjUsuarioLogado(Usuario) {
    sessionStorage.setItem("UsuarioLogadoObj-EstudosLucas", Usuario);
  }

  //Serviço retorna obj com usuario logado
  ObjUsuarioLogado(): any {
    return JSON.parse(sessionStorage.getItem("UsuarioLogadoObj-EstudosLucas"));
  } 

  criarAlunos(aluno:any){
    return this.http.post(this.alunosUrl, aluno);
  }

  getAlunobyID(aluno:any){
    return this.http.get(this.alunosID, aluno.id);
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
