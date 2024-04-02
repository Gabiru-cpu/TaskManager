import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AssignmentModel } from "../models/assignment.model";
import { NewAssignmentModel } from "../models/newAssignment.model";

const apiUrl = "https://localhost:44378/Assignment/";

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    constructor( private http: HttpClient ) { }

    listAssignmentByAssignmentListId(assignmentListId: number): Observable<AssignmentModel[]>{
        return this.http.get<any>(`${apiUrl}list-assignments-by-assignment-list?assignmentListId=${assignmentListId}`).pipe(map(listAssignment =>{
            return listAssignment;
        }))
    }

    updateAssignmentStatus(assignmentId: number): Observable<AssignmentModel> {
        return this.http.patch<any>(`${apiUrl}update-assignment-status?assignmentId=${assignmentId}`, {}).pipe(map(assignment => {
            return assignment;
        }))
    }

    createAssignment(newAssignment: NewAssignmentModel): Observable<AssignmentModel>{
        return this.http.post<any>(`${apiUrl}create-assignment`, newAssignment).pipe(map(assignment => {
            return assignment;
        }))
    }

    deleteAssignment(assignmentId: number): Observable<number>{
        return this.http.delete<any>(`${apiUrl}delete-assignment-by-id?assignmentId=${assignmentId}`).pipe(map(deletions=>{
            return deletions
        }))
    }
}
