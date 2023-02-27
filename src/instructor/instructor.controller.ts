import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Course, Instructor } from "./instructor.dto";
import { InstructorService } from "./instructor.service";

@Controller("/instructor")
export class InstructorController
{
    constructor(private instructorservice: InstructorService){}

    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() instructordto: Instructor):any{
        return this.instructorservice.registration(instructordto);
    }

    @Get("/dashboard")
    getInstructor(): any{
        return this.instructorservice.getDashboard();
    }

    @Post("/insertstudent")
    @UsePipes(new ValidationPipe())
    insertStudent(@Body() instructordto: Instructor): any{
        return this.instructorservice.insertStudent(instructordto);
    }

    @Get("/findstudent/:id")
    getStudentByQuery(@Query() qur:any): any{
        return this.instructorservice.getStudentByQuery(qur);
    }

    @Get("/findstudent/:id")
    getStudentByID(@Param("id") id:number,):any{
        return this.instructorservice.getStudentByID(id);
    }

    @Get("/editprofile")
    getInstructorProfile(@Query() qur:any): any{
        return this.instructorservice.getInstructorProfile(qur);
    }

    @Post("/insertcourse")
    @UsePipes(new ValidationPipe())
    insertCourse(@Body() instructordto: Course): any{
        return this.instructorservice.insertCourse(instructordto);
    }

    

}
