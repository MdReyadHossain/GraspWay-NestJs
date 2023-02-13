import { Injectable } from "@nestjs/common";
import { Course, Instructor } from "./instructor.dto";

@Injectable()
export class InstructorService{

    getDashboard(): string{
        return "Dashboard for Instructor.";
    }

    registration(instructordto:Instructor): any{
        return `Registration Successfull.
                ID is: ${instructordto.id}
                Instructor Name: ${instructordto.instructorname}
                User Name: ${instructordto.name}
                Email Address: ${instructordto.email}
                Phone Number: ${instructordto.phonenumber}
                Password: ${instructordto.password}
                Age: ${instructordto.age}
                Date of Birth: ${instructordto.dob}
                Course: ${instructordto.course}`;
    }

    insertStudent(instructordto:Instructor):any{
        return "Student Inserted Name: " + instructordto.name + " and ID is: " + instructordto.id;
    }

    getStudentByQuery(qur): any{
        return "Student Name is " + qur.name + ". ID is " + qur.id;
    }
    
    getStudentByID(id): any{
        return "Student ID is " + id;
    }

    

    getInstructorProfile(qur): any{
        return "Instructor Name Changed to " + qur.name +"."
    }

    insertCourse(instructordto:Course):any{
        return instructordto.course + " Course Inserted. Where ID is " + instructordto.id +".";
    }
}