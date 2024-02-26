import { Time } from "@angular/common";

export class NewAssignmentModel {
    title!: string;
    description: string = "";
    dueDate!: Date;
    assignmentListId!: number
}