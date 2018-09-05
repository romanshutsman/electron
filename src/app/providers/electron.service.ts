import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote, Menu, MenuItem } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { MatDialog } from '@angular/material';
import { DialogVersionsComponent } from '../components/dialog-versions/dialog-versions.component';



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


  constructor(public dialog: MatDialog) {
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
        this.dialog.open(DialogVersionsComponent);
      }
    }]);
    remote.Menu.setApplicationMenu(this.menu);
  }

  chooseVersionsofControllers(body) {
    // return this.http.post(this.API_URL + '/connect/' , body);
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  }
}
