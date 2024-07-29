import { Component, OnInit } from '@angular/core';
interface MenuItem {
  label: string;
  link?: string;
  icon?: string;
  submenu?: MenuItem[];
}
@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

  chauffeurNotifications = [
    { message: 'Chauffeur Notification 1' },
    { message: 'Chauffeur Notification 2' },
    { message: 'Chauffeur Notification 3' }
  ];

  chauffeurProfileLink = '/chauffeur/profile';

  chauffeurMenu:  MenuItem[] = [
    {
      label: 'Déménagement', icon: 'move_to_inbox', submenu: [
        { label: 'Ajouter déménagement', icon : 'add' ,link: '/client/add-demenagement' },
        { label: 'Liste des déménagement', icon: 'list', link: '/client/' }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
