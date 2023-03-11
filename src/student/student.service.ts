import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentEntity } from "./student.entity";

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentEntity) 
        private studentRepo: Repository<StudentEntity>,
    ) {}

    getDashboard(): any {
        return "Student entered dashboard";
    }

    //approveStudentByInstructor(studentdto: )


}