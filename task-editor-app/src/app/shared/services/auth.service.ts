import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SignInModel } from '../models/signIn.model';
import { AuthDataModel } from '../models/authData.model';
import { SignUpModel } from '../models/signUp.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const apiUrl = "https://localhost:44378/Auth/";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<AuthDataModel | null>
    public currentUser: Observable<AuthDataModel | null>;

    constructor (
        private router: Router,
        private http: HttpClient
    ) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject?.value;
    }

    postSignIn(signInData: SignInModel){
        return this.http.post<any>(`${apiUrl}sign-in`, signInData).pipe(map(currentUser =>{
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
            return currentUser;
        }))
    }

    postLogout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/']);
  }

    postSignUp(signUpData: SignUpModel){
        return this.http.post<any>("https://localhost:44378/User/sign-up", signUpData).pipe(map(createdUser =>{
            return createdUser
        }))
    }

}
