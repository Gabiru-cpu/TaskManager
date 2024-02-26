import { Component } from '@angular/core';
import { SignInFormComponent } from '../../public-components/sign-in-form/sign-in-form.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router';
import {routes} from '../../../app.routes'
import { SignUpFormComponent } from '../../public-components/sign-up-form/sign-up-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [SignInFormComponent, SignUpFormComponent, CommonModule, RouterModule, NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  logoPath: string = "assets/taskManagerIcon.png"
}
