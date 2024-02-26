import { Injectable } from "@angular/core";
import { AssignmentModel } from "../models/assignment.model";
import { BehaviorSubject } from "rxjs";
import { TaskContainerComponent } from "../../views/public-components/task-container/task-container.component";

@Injectable({
    providedIn: 'root'
})
export class AssignmentLoaderService{
    public listAssignmentSubject: BehaviorSubject<AssignmentModel[] | null>
    public currentErrorMessageSubject: BehaviorSubject<string | null>

    constructor( ) {
        this.listAssignmentSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('listAssignment')!))
        this.currentErrorMessageSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentErrorMessage')!))
    }

    public get listAssignmentValue(): AssignmentModel[] | null{
        return this.listAssignmentSubject?.value;
    }
    
    public get currentErrorMessageValue(): string | null {
        return this.currentErrorMessageSubject?.value;
    }

    public set listAssignmentValue(listAssignment: AssignmentModel[]) {
        this.listAssignmentSubject.next(listAssignment)
    }
    
    public set currentErrorMessageValue(currentErrorMessage: string) {
        this.currentErrorMessageSubject.next(currentErrorMessage)
    }

}