import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { SignInModel } from '../../../shared/models/signIn.model';
import  {  FormBuilder, FormGroup, FormsModule,  ReactiveFormsModule, Validators  }  from  '@angular/forms';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent implements OnInit {
  
  signInForm: FormGroup;
  accessInfo: SignInModel = new SignInModel
  signInError: string = "";

  constructor(
      private authService: AuthService, 
      private formBuilder: FormBuilder,
      private router: Router
    ) { 
      this.signInForm = this.formBuilder.group({
        inputUsername:['', Validators.required],
        inputPassword:['', Validators.required],
      })
    }

  ngOnInit(): void {
  }

  signInSubmit(): void{
    this.accessInfo.userName = this.signInForm.controls['inputUsername'].value;
    this.accessInfo.password = this.signInForm.controls['inputPassword'].value;
    this.signIn(this.accessInfo);
  }

  signIn( signInData: SignInModel ){
    this.authService.postSignIn(signInData).pipe(first()).subscribe({
      next: () => {
        this.router.navigate(['/task-dashboard'])
      },
      error: error => {
        this.signInError = (error.error)
      }
    })
  }

}
