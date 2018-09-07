import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote, Menu, MenuItem } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable()
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  menu:  Menu;
  menuItem:  MenuItem;
  bSubject = new BehaviorSubject<any>(false); 

  constructor(public dialog: MatDialog, private http: HttpClient) {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
    this.menu = remote.Menu.buildFromTemplate([
      {
        label: 'Connect',
        click: () => {
          this.connectVersionsofControllers().subscribe(data => {
            this.bSubject.next(data);
          });
        }
      },
      {
        label: 'devTools',
        click: () => {
          this.remote.getCurrentWebContents().openDevTools();
        }
      },
      {
        label: 'reload',
        click: () => {
          this.remote.getCurrentWebContents().reload();
        }
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      }
    ]);
    remote.Menu.setApplicationMenu(this.menu);
  }
  connectVersionsofControllers() {
    return this.http.get('/api/connect').pipe(map(data => data));
  }
  chooseVersionsofControllers(body) {
    return this.http.post('/api/connect' , body);
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  }
}
