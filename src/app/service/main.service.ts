import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public _http: HttpClient) { }


  get(url: string, headers:any = {'Content-Type':  'application/json'}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this._http.get(url, httpOptions)
  }

  post(url: string, body:object, headers:any = {'Content-Type':  'application/json'}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this._http.post(url, body, httpOptions);
  }



}
