
import { HttpClient, HttpResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { Injectable } from '@angular/core';

import * as fetch from 'electron-fetch';
import { ipcRenderer, webFrame, remote, Menu, MenuItem, net, ClientRequest } from 'electron';
import { request } from 'request';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { MatDialog, MatDialogRef } from '@angular/material';
export const API = 'http:localhost:52952/api';


@Injectable()
export class ElectronService {
  API_URL = 'http:localhost:52952/api/connect';
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  menu:  Menu;
  menuItem:  MenuItem;
  // net: net;

  ClientRequest: ClientRequest;
  // request = this.net.request('http:localhost:52952/api/connect');
  options = {
    protocol: 'http',
    hostname: 'localhost',
    port: 52952,
    path: '/api',
    method: 'GET'
  };

  constructor(private http: HttpClient, public dialog: MatDialog) {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
    this.menu = remote.Menu.buildFromTemplate([{
      label: 'Connect',
      click: () => {
        this.openDialogOfVersions();
      }
    }]);
    remote.Menu.setApplicationMenu(this.menu);
    this.connectAPIGet();
  }
  openDialogOfVersions() {
    // this.dialog.open(DialogVersionsComponent);
    // this.dialog.open(DialogControllers);
  }
  connectVersionsofControllers() {
    // console.log(this.API_URL, forkJoin(this.http.get( API + '/connect')));
    // return forkJoin(this.http.get(API + '/connect')) ;
    // return this.http.request('HTTP:LOCALHOST:52952/API/CONNECT', '');
  //  return  fetch(this.API_URL)
  //     .then(res => {
  //       console.log(res);
  //       res.text()
  //     }
  //   )
  //     .then(body => console.log(body));
    // return this.request(this.options, (error, response, body) => {
    //   console.log(error);
    //   console.log(body);
    //   console.log(response);
    // })
  }
  chooseVersionsofControllers(body) {
    return this.http.post(this.API_URL + '/connect/' , body);
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  }
  httpGet(url) {
    let xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }
  connectAPIGet() {
    remote.getCurrentWindow().loadURL(this.API_URL);
    console.log(remote.getCurrentWindow().loadURL(this.API_URL));
    const url = this.API_URL;
    const response = this.httpGet(url);
    console.log(response)
  }
}
