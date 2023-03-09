import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "./student.dto";
import { StudentEntity } from "./student.entity";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepo: Repository<StudentEntity>
    ) {}

    
    registration(student: Student): any {
        const studentaccount = new StudentEntity();
        studentaccount.studentname = student.studentname;
        studentaccount.password = student.password;
        studentaccount.phonenumber = student.phonenumber;
        studentaccount.email = student.email;
        studentaccount.age = student.age;
        studentaccount.dob = student.dob;
        
        return this.studentRepo.save(studentaccount)
    }

    getDashboard(): any {
        return this.studentRepo.find();
    }

    courseEnroll(student): any{
        return "Course Enrolled.";
    }

    deleteStudentByID(id): any{
        return "Student Delete Successfully.";
    }

    updateStudentByID(studentdto: Student, id: number): any {
        throw new Error("Method not implemented.");
    }

    addtocartCourse(studentdto: Student): any {
        throw new Error("Method not implemented.");
    }
    addtocardcourse(studentdto: Student): any {
        throw new Error("Method not implemented.");
    }
    
    editEmailByID(studentdto: Student, id: number): any {
        throw new Error("Method not implemented.");
    }
    addcourse(studentdto: Student): any {
        throw new Error("Method not implemented.");
    }
}