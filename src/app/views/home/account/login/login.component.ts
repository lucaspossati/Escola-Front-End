import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptcha2Component, ReCaptchaV3Service } from 'ngx-captcha';
import Swal from 'sweetalert2';
import { AccountService } from '../shared/account/account.service';
import { AlunoLogin } from './login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;

  public captcha;
  siteKey: string;
  captchaValidation: boolean = false;
  login: AlunoLogin = new AlunoLogin();
  carregando: boolean = false;
  senhaInvalida: boolean = false;
  loading: boolean = false;
  public cont: number = 0;
  
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service) {

      this.siteKey= "6LfdE5caAAAAAHytfmk23nSk45Z8W0et3SkCThc3";

   }

  ngOnInit() {
  
  }


  loginFn() {
    
    if (this.cont > 2 && !this.captchaValidation) {
      return;
    }
    this.carregando = true;
    this.accountService.Login(this.login).subscribe((retornoDoBanco) => {      
 
      if (retornoDoBanco == null) {
        this.alertUsuarioInvalido();
        this.cont = this.cont + 1;

        if (this.cont > 3) {              
          this.captchaElem.resetCaptcha();
          this.captchaValidation = false;              
        }
        
        this.login.login = '';
        this.login.senha = '';
      } else {
        this.alertUsuarioAutenticado();
        this.carregando = false;
        this.captchaValidation = true;
        this.loading = true;
        // Colocaria o objeto em uma sessionStorage (remove tudo que salva após fechamento) || localStorage
        this.accountService.setarObjUsuarioLogado(JSON.stringify(retornoDoBanco));  

        this.accountService.gerarToken(this.login).subscribe((retornoDoBanco)=> {
          var token = retornoDoBanco.access_token;
          
          sessionStorage.setItem('token-access', token);
          this.router.navigate(['home']);   
                
        });

          
      }
      
      this.carregando = false;
    });
  }
  handleExpire(){
    this.captchaValidation = false;
  }

  handleLoad(){
    this.captchaValidation = false;
  }


  handleSuccess(parametro){
    this.captchaValidation = true;
  }

  alertUsuarioInvalido(){
    
    Swal.fire({
      title: 'Usuário ou senha inválidos',
      icon: 'error',
      confirmButtonText: 'Fechar',     
    })
  }

  alertUsuarioAutenticado(){
    
    Swal.fire({
      title: 'Usuário autenticado',
      icon: 'success',
      confirmButtonText: 'Fechar',     
    })
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
