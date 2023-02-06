import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Instructor } from "./instructor.dto";
import { InstructorService } from "./instructor.service";

@Controller("/instructor")
export class InstructorController
{
    constructor(private instructorservice: InstructorService){}

    @Get("/dashboard")
    getInstructor(): any{
        return this.instructorservice.getDashboard();
    }

    @Get("/findstudent/:id")
    getStudentByID(@Param("id") id:number,):any{
        return this.instructorservice.getStudentByID(id);
    }

    @Post("/insertstudent")
    insertstudent(@Body() instructordto: Instructor): any{
        return this.instructorservice.insertstudent(instructordto);
    }

    
}
