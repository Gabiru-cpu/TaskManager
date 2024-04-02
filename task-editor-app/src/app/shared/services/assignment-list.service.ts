import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SignInModel } from '../models/signIn.model';
import { AuthDataModel } from '../models/authData.model';
import { SignUpModel } from '../models/signUp.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AssignmentListModel } from '../models/assignmentList.model';
import { AssignmentModel } from './../models/assignment.model';
import { AuthService } from './auth.service';
import { NewAssignmentListModel } from '../models/newAssignmentList.model';

const apiUrl = "https://localhost:44378/AssignmentList/";

@Injectable({
    providedIn: 'root'
})
export class AssignmentListService{
    constructor( private http: HttpClient ) { }

    getAssignmentListByUserId(userId: string): Observable<AssignmentListModel[]> {

        return this.http.get<AssignmentListModel[]>(`${apiUrl}list-assignments-by-user?userId=${userId}`).pipe(map(listAssignmentList =>{
            return listAssignmentList;
        }))
    }

    postCreateAssignmentList(newAssignmentListModel: NewAssignmentListModel): Observable<AssignmentListModel>{
        return this.http.post<any>(`${apiUrl}create-assignment-list`, newAssignmentListModel).pipe(map(assignmentList =>{
            return assignmentList
        }))
    }

    ListAssignmentByAssignmentList(assignmentListId: number): Observable<AssignmentListModel[]> {
      return this.http.get<any[]>(`${apiUrl}list-assignment-by-assignment-list?assignmentListId=${assignmentListId}`);
    }
}
