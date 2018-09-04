import { Component, OnInit, Inject } from '@angular/core';
import { ElectronService } from './../../providers/electron.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dialog-versions',
  templateUrl: './dialog-versions.component.html',
  styleUrls: ['./dialog-versions.component.scss']
})
export class DialogVersionsComponent implements OnInit {
  listOfControllers: any = [];
  constructor(private electron: ElectronService, public dialog: MatDialog, private http: HttpClient) {
    this.loadVersionOfControllers();
   }

  ngOnInit() {
  }
  loadVersionOfControllers() {
    this.electron.connectVersionsofControllers();
    console.log(this.listOfControllers, 'list');
    console.log(this.electron.connectVersionsofControllers(), 'con');
  }
  chooseBersions(body) {
    console.log(body);
    this.electron.chooseVersionsofControllers(body);
  }
  openDialog() {
    this.dialog.open(DialogControllers);
    console.log('open');
  }
  
}

@Component({
  selector: 'dialog-controllers',
  templateUrl: 'dialog-controllers.html'
})
export class DialogControllers {
  constructor(
    public ref: MatDialogRef<DialogControllers>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

}