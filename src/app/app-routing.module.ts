import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './views/home/account/create-account/create-account.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { AuthGuard } from './views/home/account/shared/auth/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { AuthenticationComponent } from './views/home/layout/authentication/authentication.component';


const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent,
    
    canActivate: [AuthGuard]
    
  },

  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent}
      
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

