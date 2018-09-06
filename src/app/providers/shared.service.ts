import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
// import { Headers,RequestOptions } from '@angular/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class SharedService {
versions;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    this.versions = this.connectVersionsofControllers();
    // console.log(this.versions, 'VERSIONS');
   }
  connectVersionsofControllers() {
    // return this.http.get('http://127.0.0.1:84/api/connect').pipe(
    return this.http.get('/api/connect').pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
  chooseVersions(body) {
    const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authentication', `hello`);

      //  const options = new RequestOptions({headers: headers});

    return this.http.post('/api/connect/', body);
    // return this.http.post('http://127.0.0.1:84/api/connect/', body).subscribe();
  }
}
