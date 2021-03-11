import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  apiUrl = "https://localhost:44311/api/bibliotecas"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getBibliotecaWithFlag(flag: string): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + '?flag='+flag);
  }
}
