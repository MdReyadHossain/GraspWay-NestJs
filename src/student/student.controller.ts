import { Controller, Get } from "@nestjs/common";
import { StudentService } from "./student.service";

@Controller("/student")
export class StudentController{
    constructor(private studentservice: StudentService){}

    @Get("/dashboard")
    getDashboard(): any{
        return this.studentservice.getDashboard();
    }
}