import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Course, InstructorLogin, InstructorReg } from "./instructor.dto";
import { InstructorService } from "./instructor.service";

@Controller("/instructor")
export class InstructorController
{
    constructor(private instructorservice: InstructorService){}

    //---------- Instructor----------//

    //-----Instructor Registration-----//
    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() instructordto: InstructorReg):any{
        return this.instructorservice.registration(instructordto);
    }

    //-----Instructor Login-----//
    @Post("/login")
    @UsePipes(new ValidationPipe())
    login(@Body() instructordto: InstructorLogin): any{
        return this.instructorservice.login(instructordto);
    }


    @Get("/dashboard")
    getInstructor(): any{
        return this.instructorservice.getDashboard();
    }

    @Post("/insertstudent")
    @UsePipes(new ValidationPipe())
    insertStudent(@Body() instructordto: InstructorReg): any{
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

    @Patch("/editinstructor/:id")
    //@UsePipes(new ValidationPipe())
    editEmailByID(@Body() instructordto: InstructorReg, @Param('id', ParseIntPipe) id: number): any{
        return this.instructorservice.editEmailByID(instructordto, id);
    }

    @Post("/insertcourse")
    @UsePipes(new ValidationPipe())
    insertCourse(@Body() instructordto: Course): any{
        return this.instructorservice.insertCourse(instructordto);
    }

    @Put("/updateinstructor/:id")
    updateInstructorByID(@Body() instructordto:InstructorReg, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.updateInstructorByID(instructordto, id);
    }

    @Delete("/deleteinstructor/:id")
    deleteInstructorByID(@Param("id", ParseIntPipe) id: number): any{
        return this.instructorservice.deleteInstructorByID(id);
    }

}
