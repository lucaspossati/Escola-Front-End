import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private accountService: AccountService){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    const token = window.localStorage.getItem('token');
    const alunoLogado = this.accountService.ObjUsuarioLogado();
    if (alunoLogado == null) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }

    // if(token){
    //   return true;
    // } else {
    //   this.router.navigate(['login']);
    //   return false;
    // }
  }
  
}
