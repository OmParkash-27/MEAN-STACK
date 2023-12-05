import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  serverURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  postRequest(api: string, form: any) {
    return this.http.post(this.serverURL + api, form);
  }
}
