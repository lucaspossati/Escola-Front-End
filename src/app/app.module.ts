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
import { HttpClientModule } from '@angular/common/http';
import { DisciplinasListComponent } from './views/home/disciplinas-list/disciplinas-list.component';
import { BibliotecaListComponent } from './views/home/biblioteca-list/biblioteca-list.component';
import { LoginComponent } from './views/home/account/login/login.component';
import { FormsModule }   from '@angular/forms';
import { AuthenticationComponent } from './views/home/layout/authentication/authentication.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlunoListComponent,
    DisciplinasListComponent,
    BibliotecaListComponent,
    LoginComponent,
    AuthenticationComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
