import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transporters = [
    { name: 'John Doe', country: 'USA', experience: '10 years', image: '../../assets/homeimg/tansporteur1.jpg' },
    { name: 'Jane Smith', country: 'UK', experience: '8 years', image: '../../assets/homeimg/tansporteur2.jpg' },
    { name: 'Carlos Rivera', country: 'Spain', experience: '5 years', image: '../../assets/homeimg/transporteur3.jpg' },
    { name: 'Carlos Rivera', country: 'Spain', experience: '5 years', image: '../../assets/homeimg/transporteur5.jpg' }

  ];

  typesDemenagement = [
    { type: 'Bureautique', image: '../../assets/homeimg/burautique.jpg' },
    { type: 'Maison', image: '../../assets/homeimg/maison.jpg' },
    { type: 'Maison', image: '../../assets/homeimg/maison.jpg' }
,
{ type: 'Maison', image: '../../assets/homeimg/maison.jpg' }

  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  login() {
    this.router.navigateByUrl('auth/login')
  }
}
