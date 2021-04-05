import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  // Conexión con el servidor del back
  private APISERVER: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getStatesByCountry(id: string): Observable<any> {
    return this.http.get(`${this.APISERVER}/state/${id}`);
  }
}
