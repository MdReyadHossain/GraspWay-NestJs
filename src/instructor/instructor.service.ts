import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course, Instructor } from "./instructor.dto";
import { InstructorEntity } from "./instructor.entity";

@Injectable()
export class InstructorService{

    constructor(
        @InjectRepository(InstructorEntity)
        private instructorRepo: Repository<InstructorEntity>
    ) {}

    getDashboard(): any{
        return this.instructorRepo.find();
    }

    registration(instructor: Instructor): any{
        const instructoraccount = new InstructorEntity();
        instructoraccount.instructorname = instructor.instructorname;
        instructoraccount.password = instructor.password;
        instructoraccount.phonenumber = instructor.phonenumber;
        instructoraccount.email = instructor.email;
        instructoraccount.age = instructor.age;
        instructoraccount.dob = instructor.dob;
        instructoraccount.course = instructor.course;
        
        return this.instructorRepo.save(instructoraccount)
    }

    insertStudent(instructordto:Instructor):any{
        //return "Student Inserted Name: " + instructordto.name + " and ID is: " + instructordto.id;
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

    updateInstructorByID(instructordto: Instructor, id: number): any {
        return this.instructorRepo.update(id, instructordto);
    }

    deleteInstructorByID(id): any{
        return this.instructorRepo.delete(id);
    }
}