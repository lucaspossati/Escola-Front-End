import { HttpClient } from '@angular/common/http';
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

  //Serviço seta Objeto do usuario logado
  setarObjUsuarioLogado(Usuario) {
    sessionStorage.setItem("UsuarioLogadoObj-EstudosLucas", Usuario);
  }

  //Serviço retorna obj com usuario logado
  ObjUsuarioLogado(): any {
    return JSON.parse(sessionStorage.getItem("UsuarioLogadoObj-EstudosLucas"));
  } 

  //Serviço remove os parametros de usuário logado
  deslogar() {
    // sessionStorage.setItem("Token-MRA", null);    
    sessionStorage.setItem("UsuarioLogadoObj-EstudosLucas", null);    
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
