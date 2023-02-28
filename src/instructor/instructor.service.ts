import { Injectable } from "@nestjs/common";
import { Instructor } from "./instructor.dto";

@Injectable()
export class InstructorService{

    getDashboard(): string{
        return "Dashboard for Instructor";
    }

    getStudentByID(id): any{
        return "Student ID is " + id;
    }

    insertstudent(instructordto:Instructor):any{
        return "Student Inserted Name: " + instructordto.name + " and ID is: " + instructordto.id;
    }
}