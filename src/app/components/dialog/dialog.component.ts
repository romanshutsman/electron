import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ElectronService } from './../../providers/electron.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  show = false;
  constructor(private electron: ElectronService, private cdRef: ChangeDetectorRef) { 

    this.electron.bSubject.subscribe(value => {
      console.log("Subscription got", value);
      if (value) {
        console.log('trie');
        this.show = true;
        this.cdRef.detectChanges();
      }
    });
}

  ngOnInit() {
  }
  close() {
    this.show = false;
    this.cdRef.detectChanges();
  }
}
