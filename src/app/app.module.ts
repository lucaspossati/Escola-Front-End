import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AlunoListComponent } from './views/home/aluno-list/aluno-list.component';
import {MatTabsModule} from '@angular/material/tabs';;
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DisciplinasListComponent } from './views/home/disciplinas-list/disciplinas-list.component';
import { BibliotecaListComponent } from './views/home/biblioteca-list/biblioteca-list.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { FormsModule }   from '@angular/forms';
import { AuthenticationComponent } from './views/home/layout/authentication/authentication.component';
import { CustomHttpInterceptor } from './custom-http-interceptor';
import { CadastrarAlunosComponent } from './views/home/aluno-list/cadastrar-alunos/cadastrar-alunos.component';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlunoListComponent,
    DisciplinasListComponent,
    BibliotecaListComponent,
    LoginComponent,
    AuthenticationComponent,
    CadastrarAlunosComponent,
  
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatProgressSpinnerModule,
    NgxCaptchaModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
