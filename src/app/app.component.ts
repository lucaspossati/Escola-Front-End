import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'escola-frontend';
  constructor(private httpClient: HttpClient) {}

  method1Call(): void {
    this.httpClient
      .get('https://localhost:44311/api/alunoss')
      .subscribe(success => {
        console.log('Successfully Completed');
        console.log(success);
      });
  }

  
}
