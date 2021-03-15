import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account/account.service';
import { AlunoLogin } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: AlunoLogin = new AlunoLogin();
  carregando: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router) {

   }

  ngOnInit() {
    // this.login.login = 'lucasdavi';
    // this.login.senha = '123456';
  }

  loginFn() {
    console.log("Iniciou a comunicação com o banco");
    this.carregando = true;
    this.accountService.Login(this.login).subscribe((retornoDoBanco) => {      
      console.log("Comunicou com o banco");
      console.log("Resultado =>", retornoDoBanco );

      if (retornoDoBanco == null) {
        console.log("Usuário e senha inválidos");
      } else {
        // Colocaria o objeto em uma sessionStorage (remove tudo que salva após fechamento) || localStorage
        this.accountService.setarObjUsuarioLogado(JSON.stringify(retornoDoBanco));
        
        console.log("Pronto para logar");    

        this.router.navigate(['home']);
          
      }

      this.carregando = false;
    });
  }
  // async loginFn() {
  //   try{
  //     const result = await this.accountService.Login(this.login);
  //     console.log(`Login Efetuado: ${result}`);
  //     this.router.navigate(['']);
  //   } catch (error){
  //     console.error(error);
      
  //   }
  // }

  

}
