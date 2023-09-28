import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = "http://127.0.0.1:8000/";
  api: string = ''; 
  headers = new HttpHeaders({
  'Accept': 'application/json'
  });
  requestOption = {
    headers: this.headers
  };

  constructor(private httpClient: HttpClient) {

   }
  getRequest(urlApi: string): any {
   return this.httpClient.get(this.url + urlApi);
  }
  getRequestById(urlApi: string, id: string): any {
    return this.httpClient.get(this.url + urlApi + "/" + id);
   }
  postRequest(form: any, urlApi: string): any {
    //console.log("----file name is: ", form.get('img'));
    return this.httpClient.post(this.url + urlApi, form);
  }

  deleteRequest(urlApi: string, id: string): any {
    // console.log("deleted id -----", id);    
    return this.httpClient.delete(this.url + urlApi + "/" + id);
  }

  putRequest(form: any, urlApi: string, id: string): any {
    return this.httpClient.put(this.url + urlApi + "/" + id, form, this.requestOption);
  }

}
