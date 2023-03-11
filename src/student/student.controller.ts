import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Course, Student } from "./student.dto";
import { StudentService } from "./student.service";

@Controller("/student")
export class StudentController{
    constructor(private studentservice: StudentService){}
    
    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() studentdto: Student):any{
        return this.studentservice.registration(studentdto);
    }

    @Get("/dashboard")
    getStudent(): any{
        return this.studentservice.getDashboard();
    }

    @Post("/addtocartcourse")
    @UsePipes(new ValidationPipe())
    insertStudent(@Body() studentdto: Student): any{
        return this.studentservice.addtocartCourse(studentdto);
    }

    @Post("/courseenroll")
    @UsePipes(new ValidationPipe())
    courseEnroll(@Body() studentdto: Course): any{
        return this.studentservice.courseEnroll(studentdto);
    }

    @Patch("/editstudent/:id")
    @UsePipes(new ValidationPipe())
    editEmailByID(@Body() studentdto: Student, @Param('id', ParseIntPipe) id: number): any{
        return this.studentservice.editEmailByID(studentdto, id);
    }

    @Put("/updatestudent/:id")
    updateStudentByID(@Body() studentdto:Student, @Param('id', ParseIntPipe) id: number): any {
        return this.studentservice.updateStudentByID(studentdto, id);
    }

    @Delete("/deletestudent/:id")
    deleteStudentByID(@Param("id", ParseIntPipe) id: number): any{
        return this.studentservice.deleteStudentByID(id);
    }


}