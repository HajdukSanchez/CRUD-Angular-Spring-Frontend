import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  // Conexión con el servidor del back
  private APISERVER: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getALlPersons(): Observable<any> {
    return this.http.get(`${this.APISERVER}/person/`);
  }

  public savePerson(person: any): Observable<any> {
    // Método para almacenar la persona
    return this.http.post(`${this.APISERVER}/person/`, person);
  }
}
