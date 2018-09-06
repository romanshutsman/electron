import { SharedService } from './../../providers/shared.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dialog-versions',
  templateUrl: './dialog-versions.component.html',
  styleUrls: ['./dialog-versions.component.scss']
})
export class DialogVersionsComponent implements OnInit {
  listOfControllers: any = [];
  constructor(
    private http: HttpClient,
    private shared: SharedService,
    public dialogRef: MatDialogRef<DialogVersionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.shared.connectVersionsofControllers().subscribe(data => {
      this.listOfControllers = data;
      console.log(data, 'SHARED');
    });


   }

  ngOnInit() {
  }

  // connectVersionsofControllers() {
  //   const url = 'https://baconipsum.com/api/?type=meat-and-filler';
  //   // const url = 'http://127.0.0.1:52652';
  //   const response = this.httpGet(url);
  //   console.log(response)
  //   return response;
  // }
  // httpGet(url) {
  //   let xmlHttp = null;
  //   xmlHttp = new XMLHttpRequest();
  //   xmlHttp.open('GET', url, false);
  //   xmlHttp.send(null);
  //   return xmlHttp.responseText;
  // }
  chooseBersions(body) {
    console.log(body);
    this.dialogRef.close();
    this.shared.chooseVersions(body).subscribe(data => {
      console.log(data, 'HERE');
    });
  }
  close() {
    this.dialogRef.close();

  }
}