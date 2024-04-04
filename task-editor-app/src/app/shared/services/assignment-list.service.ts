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

    updateAssignmentListName(assignmentListId: number, newName: string): Observable<any> {
      return this.http.patch(`${apiUrl}update-assignment-list-name`, { Id: assignmentListId, NewName: newName });
    }

    deleteAssignmentList(assignmentListId: number): Observable<any> {
      return this.http.delete(`${apiUrl}delete-assignment-list?assignmentListId=${assignmentListId}`);
  }

    deleteAssignmentById(assignmentId: number): Observable<any> {
      return this.http.delete(`https://localhost:44378/Assignment/delete-assignment-by-id?assignmentId=${assignmentId}`);
  }

  updateAssignmentStatus(assignmentId: number): Observable<any> {
    return this.http.patch(`https://localhost:44378/Assignment/complete-assignment-status?assignmentId=${assignmentId}`, {});
  }

  updateAssignment(assignment: any): Observable<any> {
    return this.http.patch(`https://localhost:44378/Assignment/update-assignment`, assignment);
  }

  createAssignment(assignment: any): Observable<any> {
    return this.http.post(`https://localhost:44378/Assignment/create-assignment`, assignment);
  }
}
