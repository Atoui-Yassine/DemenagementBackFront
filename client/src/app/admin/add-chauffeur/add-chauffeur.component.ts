import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.css']
})
export class AddChauffeurComponent implements OnInit {
  @ViewChild('fileInputAvatar') fileInputAvatar!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  error!: string;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;

  nationalities = {
    data: [
      { id: 1, name: 'American', description: 'United States of America' },
      { id: 2, name: 'British', description: 'United Kingdom' },
      { id: 3, name: 'Canadian', description: 'Canada' },
      { id: 4, name: 'French', description: 'France' },
      { id: 5, name: 'German', description: 'Germany' },
      { id: 6, name: 'Italian', description: 'Italy' },
      { id: 7, name: 'Japanese', description: 'Japan' },
      { id: 8, name: 'Chinese', description: 'China' },
      { id: 9, name: 'Indian', description: 'India' },
      { id: 10, name: 'Brazilian', description: 'Brazil' }
    ]
  };

  currentStepper:number = 0;
  isEditable = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    this.step1Form = this.formBuilder.group({
      avatar: [''],
      nationality: ['', Validators.required],
      firstname: ['aaa', [Validators.required, Validators.minLength(2)]],
      lastname: ['aaa', [Validators.required, Validators.minLength(2)]],
      vitale:['aaa', [Validators.required, Validators.minLength(2)]],
      rib:['aaa', [Validators.required, Validators.minLength(2)]],
      date_naissance: ['', Validators.required],
      lieu_naissance: ['aaa', Validators.required],
      email: ['aaaa', [Validators.required, Validators.email]],
      adresse: ['aaa', Validators.required],
      telephone1: ['1234567890', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telephone2: ['1234567890', Validators.pattern(/^\d{10}$/)]
    });

    this.step2Form = this.formBuilder.group({
      num_permis: ['1234567890', Validators.required],
      date_delivrance: ['', Validators.required],
      lieu_delivrance: ['aaa', Validators.required]
    });

    this.step3Form = this.formBuilder.group({
      piece_identite: ['aaaa', Validators.required],
      num_piece: ['aaa', Validators.required],
      date_delivrancePiece: ['', Validators.required],
      lieu_delivrancePiece: ['aaaa', Validators.required]
    });

    this.step4Form = this.formBuilder.group({
      name_formation: ['aaaa', Validators.required],
      filename: ['']
    });
  }

  selectFileAvatar() {
    this.fileInputAvatar.nativeElement.click();
  }

  onSelectFileAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const avatarControl = this.step1Form.get('avatar');
      if (avatarControl) {
        avatarControl.setValue(file.name);
      }
    }
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const filenameControl = this.step4Form.get('filename');
      if (filenameControl) {
        filenameControl.setValue(file.name);
      }
    }
  }

  addStep1() {
    this.currentStepper++;
  }

  addStep2() {
    this.currentStepper++;
  }

  addStep3() {
    this.currentStepper++;
  }

  addStep4() {
    this.currentStepper++;
    this.error=''
  }

  reset() {
    this.step1Form.reset();
    this.step2Form.reset();
    this.step3Form.reset();
    this.step4Form.reset();
    this.currentStepper = 0;
  }

  submitChauffeur() {
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid && this.step4Form.valid) {
      const chauffeur: Chauffeur = {
        ...this.step1Form.value,
        ...this.step2Form.value,
        ...this.step3Form.value,
        ...this.step4Form.value
      };
      console.log('chauffeur :', chauffeur)
      this.adminService.addChauffeur(chauffeur).subscribe(
        (response : Chauffeur[]) => {
          console.log('Chauffeur added successfully:', response);
          this.router.navigate(['/admin/list-chauffeur']);
          this.reset()
        },
        (error) => {
          this.error = error.error
          console.error('Error adding chauffeur:', error.error);
        }
      );
    }
  }
}
