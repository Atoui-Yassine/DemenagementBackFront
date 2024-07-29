import { Component, OnInit } from '@angular/core';
interface MenuItem {
  label: string;
  link?: string;
  icon?: string;
  submenu?: MenuItem[];
}
@Component({
  selector: 'app-chauffeur-layout',
  templateUrl: './chauffeur-layout.component.html',
  styleUrls: ['./chauffeur-layout.component.css']
})
export class ChauffeurLayoutComponent implements OnInit {

  chauffeurNotifications = [
    { message: 'Chauffeur Notification 1' },
    { message: 'Chauffeur Notification 2' },
    { message: 'Chauffeur Notification 3' }
  ];

  chauffeurProfileLink = '/chauffeur/profile';

  chauffeurMenu:  MenuItem[] = [
    {
      label: 'Déménagement', icon: 'move_to_inbox', submenu: [
        { label: 'Liste des déménagement', icon: 'list', link: '/chauffeur' }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
