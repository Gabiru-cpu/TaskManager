import { Component, OnInit } from '@angular/core';
import { SignUpModel } from '../../../shared/models/signUp.model';
import { AuthService } from '../../../shared/services/auth.service';
import  {  FormBuilder, FormGroup, FormsModule,  ReactiveFormsModule, Validators  }  from  '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [FormsModule,  ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnInit {

  signUpForm: FormGroup;
  accessInfo: SignUpModel = new SignUpModel;
  signUpError: string = "";
  signUpResponse: string = "";

  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router
    ) {
      this.signUpForm = this.formBuilder.group({
        inputEmail:['', Validators.required],
        inputUsername:['', Validators.required],
        inputPassword:['', Validators.required],
        inputPasswordConfirm:['', Validators.required],
      })
    }

  ngOnInit(): void {
  }

  signInSubmit(): void{
    this.accessInfo.email = this.signUpForm.controls['inputEmail'].value;
    this.accessInfo.userName = this.signUpForm.controls['inputUsername'].value;
    this.accessInfo.password = this.signUpForm.controls['inputPassword'].value;
    this.accessInfo.passwordConfirm = this.signUpForm.controls['inputPasswordConfirm'].value;
    this.signUp(this.accessInfo);
  }

  signUp( signUpData: SignUpModel ){
    this.authService.postSignUp(signUpData).pipe(first()).subscribe({
      next: () => {
        this.signUpResponse = ("Account created successfully!")
        this.signUpError = ""
      },
      error: error => {
        if (error.status === 0) {
          this.signUpError = "Não foi possível conectar ao servidor. Verifique sua conexão de internet.";
        } else {
          this.signUpError = "Não foi possível criar conta. Por favor, verifique os dados inseridos e tente novamente.";
        }
      }
    })

  }

}
