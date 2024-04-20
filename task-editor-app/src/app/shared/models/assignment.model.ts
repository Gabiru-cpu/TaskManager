import { DatePipe } from "@angular/common";

export class AssignmentModel {
    id?: number;
    title?: string;
    description?: string;
    isCompleted?: boolean;
    dueDate?: Date;
    address?: string;
    latitude?: number;
    longitude?: number;
}
