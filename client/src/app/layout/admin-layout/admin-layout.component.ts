import { Component, OnInit } from '@angular/core';
interface MenuItem {
  label: string;
  link?: string;
  icon?: string;
  submenu?: MenuItem[];
}
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  chauffeurNotifications = [
    { message: 'Chauffeur Notification 1' },
    { message: 'Chauffeur Notification 2' },
    { message: 'Chauffeur Notification 3' }
  ];

  chauffeurProfileLink = '/chauffeur/profile';

  chauffeurMenu:  MenuItem[] = [
    {
      label: 'Chauffeur', icon: 'persons', submenu: [
        { label: 'Ajouter Chauffeur', icon: 'add',link: '/admin/add-chauffeur' },
        { label: 'Liste des Chauffeurs', icon: 'list', link: '/admin/list-chauffeur' }
      ]
    },
    {
      label: 'Véhicule', icon: 'local_shipping', submenu: [
        { label: 'Ajouter Véhicule', icon : 'add' ,link: '/admin/add-camion' },
        { label: 'Liste des Véhicules', icon: 'list', link: '/admin/list-camion' }
      ]
    },
    {
      label: 'Client', icon: 'persons', submenu: [
        { label: 'Liste des Client', icon: 'list', link: '/admin/list-client' }
      ]
    },
    {
      label: 'Déménagement', icon: 'move_to_inbox', submenu: [
        { label: 'Liste des déménagement', icon: 'list', link: '/admin/list-demenagement' }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
