import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-task-list-header',
  standalone: true,
  imports: [],
  templateUrl: './task-list-header.component.html',
  styleUrl: './task-list-header.component.scss'
})
export class TaskListHeaderComponent implements OnInit{
  logoPath: string = "assets/taskManagerIcon.png"
  currentUserName: string = 'notLoggedIn';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const currentUserValue = this.authService.currentUserValue?.currentUser
    if(currentUserValue != undefined) {
      if(currentUserValue.userName != undefined) this.currentUserName = currentUserValue.userName;
    }
  }
}
