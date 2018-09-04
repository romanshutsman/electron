import { ElectronService } from './../../providers/electron.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private rendererApp: ElectronService) { }

  ngOnInit() {
  }
  onClickLiItem() {
    console.log('hello');
  }
}