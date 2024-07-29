import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-demenagement',
  templateUrl: './add-demenagement.component.html',
  styleUrls: ['./add-demenagement.component.css']
})
export class AddDemenagementComponent implements OnInit {

  reserveForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientservice:ClientService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.reserveForm = this.fb.group({
      date: ['', Validators.required],
      startAddress: ['', Validators.required],
      endAddress: ['', Validators.required],
      furnitureCategory: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.reserveForm.valid) {
      const reservation = this.reserveForm.value;
      this.clientservice.addDemenagement(reservation).subscribe(
        (response) => {
          console.log('Reservation created successfully:', response);
          this.router.navigate(['/client']); 
        },
        (error) => {
          console.error('Error created reservation:', error);
        }
      );
    }
  }
}
