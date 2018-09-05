import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
versions;
  constructor(
    public dialog: MatDialog
  ) {
    this.versions = this.connectVersionsofControllers();
    console.log(this.versions, 'VERSIONS');
   }
  connectVersionsofControllers() {
    const url = 'https://baconipsum.com/api/?type=meat-and-filler';
    // const url = 'http://127.0.0.1:52652';
    const response = this.httpGet(url);
    // console.log(response)
    return response;
  }
  httpGet(url) {
    let xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
}
