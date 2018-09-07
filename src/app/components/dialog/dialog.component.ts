import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ElectronService } from './../../providers/electron.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  show: boolean = false;
  showConnect: boolean = false;
  list: any = [];
  controller: string;
  message: any;

  constructor(private electron: ElectronService, private cdRef: ChangeDetectorRef) { 
    this.electron.bSubject.subscribe(value => {
      if (value) {
        this.list = value;
        this.show = true;
        this.cdRef.detectChanges();
      }
    });
}

  ngOnInit() {
  }
  choose(item) {
    console.log(this.list);
    this.controller = item;
    this.cdRef.detectChanges();
    const body = {};
    body["Name"] = item;
    this.electron.chooseVersionsofControllers(body).subscribe(data => {
      this.message = data;
      this.cdRef.detectChanges();
      this.showConnect = true;
    });
    setTimeout(() => {      
      this.show = false;
      this.cdRef.detectChanges();
    }, 500);
  }
  closeModal1() {
    this.show = false;
    this.cdRef.detectChanges();
  }
  closeModal2() {
    this.showConnect = false;
    this.cdRef.detectChanges();
  }
}
