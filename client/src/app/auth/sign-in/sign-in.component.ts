import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/UserLogin';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStoregService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;
  passwordVisible: boolean = false;
  error!: string;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authservice : AuthService,
    private tokeService : TokenStoregService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if(this.loginForm.valid){
      const user : UserLogin = this.loginForm.value;
      this.authservice.signIn(user).subscribe((res)=>{
        this.tokeService.saveToken(res.token);
        this.tokeService.saveRoles(res.roles)
        this.tokeService.navigetURL(res.roles);
      },
    (error) =>{
     // this.error = 'Login failed. Please try again.';
      console.log('Login Error :',error);
    })
    }
    
  }
  onClick(){
    this.router.navigateByUrl('auth/register')
  }

}
