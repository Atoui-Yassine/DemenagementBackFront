import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/UserRegister';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerFormGroup!: FormGroup;
  error!: string;
  visible: boolean = false;
  passwordVisible: boolean = false;
  passwordConfirmVisible: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, { validator: this.passwordMatchValidator });
  }

  get f() {
    return this.registerFormGroup.controls;
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordConfirmVisibility(): void {
    this.passwordConfirmVisible = !this.passwordConfirmVisible;
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerFormGroup.valid) {
      const { firstname, lastname, email,  password , address , phone } = this.registerFormGroup.value;
      const userRegister: UserRegister = { firstname, lastname, email,  password , address , phone};
      
      this.authService.signUp(userRegister).subscribe(
        (res) => {
          this.router.navigate(['auth/login']);
        },
        (error) => {
          this.error = 'Registration failed. Please try again.';
          console.log('Register Failed',error)
        }
      );
    }else{
      console.log('form not valid')
    }
  }

  onClick() {
    this.router.navigateByUrl('auth/login');
  }
}
