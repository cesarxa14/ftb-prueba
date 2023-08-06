import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //API de mi propio backend creado
  private urlSunatTipoCambio: string = 'https://api-sunat-cesar.onrender.com'

  constructor(
    private http: HttpClient
  ) { }

  getDataSunat(){
    return this.http.get(`${this.urlSunatTipoCambio}`);
  }
}
