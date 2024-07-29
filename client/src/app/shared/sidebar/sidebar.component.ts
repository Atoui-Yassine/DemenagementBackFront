import { Component, Input, OnInit } from '@angular/core';

interface MenuItem {
  label: string;
  link?: string;
  icon?: string;
  submenu?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
