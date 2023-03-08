import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Verify } from "crypto";
import { Course, EditInfo, ForgetPin, InstructorEdit, InstructorLogin, InstructorReg, ResetPassword, VerifyPin } from "./instructor.dto";
import { InstructorService } from "./instructor.service";

@Controller("/instructor")
export class InstructorController
{
    constructor(private instructorservice: InstructorService){}

    //--------------------General Part Start--------------------//

    //-----Instructor Registration-----//
    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() instructordto: InstructorReg): any{
        return this.instructorservice.registration(instructordto);
    }

    //-----Instructor Login-----//
    @Post("/login")
    @UsePipes(new ValidationPipe())
    login(@Body() instructordto: InstructorLogin): any{
        return this.instructorservice.login(instructordto);
    }

    //-----Instructor Forget Pin-----//
    @Post("/forgetpin/")
    forgetpin(@Body() instructordto: ForgetPin): any{
        return this.instructorservice.forgetpin(instructordto);
    }

    //-----Instructor Verify Pin-----//
    @Post("/verifypin")
    verifypin(@Body() instructordto: VerifyPin): any{
        return this.instructorservice.verifypin(instructordto);
    }

    //--------------------General Part End--------------------//

    //--------------------Instructor Access Part Start--------------------//

    //-----Instructor Dashboard-----//
    @Get("/dashboard")
    getInstructor(): any{
        return this.instructorservice.getDashboard();
    }

    //-----Instructor Edit Profile-----//
    @Patch("/editinstructorinfo/:id")
    @UsePipes(new ValidationPipe())
    editInfoByID(@Body() instructordto: EditInfo, @Param('id', ParseIntPipe) id: number): any{
        return this.instructorservice.editInfoByID(instructordto, id);
    }

    //-----Instructor Profile Update-----//
    @Put("/updateinstructorinfo/:id")
    @UsePipes(new ValidationPipe())
    updateInstructorByID(@Body() instructordto: InstructorEdit, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.updateInstructorByID(instructordto, id);
    }

    //-----Instructor Password Reset-----//
    @Patch("/resetpassword/:id")
    @UsePipes(new ValidationPipe())
    resetPasswordByID(@Body() instructordto: ResetPassword, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.resetPasswordByID(instructordto, id);
    }

    //-----Instructor Search-----//
    @Get("/searchinstructor/:id")
    searchInstructorByID(@Param('id', ParseIntPipe) id: number): any{
        return this.instructorservice.searchInstructorByID(id);
    }

    //-----Insert Student-----//
    @Post("/insertstudent")
    @UsePipes(new ValidationPipe())
    insertStudent(@Body() instructordto: InstructorReg): any{
        return this.instructorservice.insertStudent(instructordto);
    }

    //-----Confirm Student Request-----//
    

    //-----Find Student By ID-----//
    @Get("/findstudent/:id")
    getStudentByID(@Param("id") id:number,):any{
        return this.instructorservice.getStudentByID(id);
    }

    //-----Find Student By Course Name-----//

    //-----Delete Student-----//

    //-----Delete Instructor-----//
    @Delete("/deleteinstructor/:id")
    deleteInstructorByID(@Param("id", ParseIntPipe) id: number): any{
        return this.instructorservice.deleteInstructorByID(id);
    }

    //--------------------Instructor Access Part End--------------------//

    //--------------------Course Related Part Start--------------------//

    //-----Add Course Content-----//
    @Post("/insertcourse")
    @UsePipes(new ValidationPipe())
    insertCourse(@Body() instructordto: Course): any{
        return this.instructorservice.insertCourse(instructordto);
    }

    //-----Modify Course Content-----//


    //-----Delete Course Content-----//


    //-----Certification-----//


    //--------------------Course Related Part End--------------------//

    //--------------------Others Start--------------------//

    //-----Query-----//
    
    //--------------------Others End--------------------//

}
