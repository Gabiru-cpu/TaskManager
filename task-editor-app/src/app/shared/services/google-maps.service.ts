import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiUrl = "https://localhost:44378/Assignment/";
@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey = 'SUA-CHAVE';

  constructor(private http: HttpClient) { }

  getAddressInfo(address: string) {
    const url = `${apiUrl}get-address-info?address=${encodeURIComponent(address)}`;
    return this.http.get(url);
  }
}
