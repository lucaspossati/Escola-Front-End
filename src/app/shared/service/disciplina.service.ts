import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  apiUrl = "https://localhost:44311/api/disciplinas"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getDisciplinasWithFlag(flag: string): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '?flag='+flag);
  }
}
