import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Vehicle } from 'src/app/models/Vehicle';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-add-camion',
  templateUrl: './add-camion.component.html',
  styleUrls: ['./add-camion.component.css']
})
export class AddCamionComponent implements OnInit {
  vehiculeForm!: FormGroup;
  categoriesObs!: Observable<any[]>;
  marques: string[] =  ['Toyota', 'Ford', 'Chevrolet', 'Honda', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen'];
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService :AdminService
  ) {}

  ngOnInit(): void {
    const categories = [
      { libelle: 'Sedan', value: 1 },
      { libelle: 'SUV', value: 2 },
      { libelle: 'Truck', value: 3 },
      { libelle: 'Van', value: 4 }
    ];

    this.categoriesObs = of(categories);

    this.vehiculeForm = this.formBuilder.group({
      immatriculation: ['', [Validators.required, Validators.pattern('[A-Z]{2}-[0-9]{3}-[A-Z]{2}')]],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      categorie: ['', Validators.required],
      nbPlaces: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      photo: [null]
    });
  }

  get immatriculation() {
    return this.vehiculeForm.get('immatriculation');
  }

  get marque() {
    return this.vehiculeForm.get('marque');
  }

  get modele() {
    return this.vehiculeForm.get('modele');
  }

  get categorie() {
    return this.vehiculeForm.get('categorie');
  }

  get nbPlaces() {
    return this.vehiculeForm.get('nbPlaces');
  }

  get photo() {
    return this.vehiculeForm.get('photo');
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
        this.vehiculeForm.patchValue({ photo: file });
      };
      reader.readAsDataURL(file);
    }
  }

  creerVehicule(): void {
    if (this.vehiculeForm.valid) {
      const vehicle: Vehicle = this.vehiculeForm.value;
      console.log(" test vehicle Form : ", vehicle)
      this.adminService.addVehicle(vehicle).subscribe(
        (res)=>{
          console.log("Vehicle : ", res)
          this.router.navigate(['/admin/list-camion']);
        },
        (error)=>{
          console.log("error create vehicle : ",error)
        }
      )
     
    }
  }

  cancel(): void {
    
    this.router.navigate(['/admin']); 
  }
}
