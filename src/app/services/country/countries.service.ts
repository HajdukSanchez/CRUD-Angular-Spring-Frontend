import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  // Conexión con el servidor del back
  private APISERVER: string = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

  public getAllCountries(): Observable<any> {
    return this.http.get(`${this.APISERVER}/country/`);
  }
}
