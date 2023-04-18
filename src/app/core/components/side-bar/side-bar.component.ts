import { Component, Input, OnInit } from '@angular/core';
import { menuItem } from '../../models/menu-item-interface';

@Component({
  selector: 'ac-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Input() menuItems: menuItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
