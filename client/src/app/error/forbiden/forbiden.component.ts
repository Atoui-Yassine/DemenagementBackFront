import { Component, OnInit } from '@angular/core';
import { TokenStoregService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-forbiden',
  templateUrl: './forbiden.component.html',
  styleUrls: ['./forbiden.component.css']
})
export class ForbidenComponent implements OnInit {

  constructor(public tokenStoreg:TokenStoregService) { }

  ngOnInit(): void {
  }

}
