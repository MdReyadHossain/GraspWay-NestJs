import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Session, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Course, Studentinfo, StudentLogin } from "./student.dto";
import { StudentService } from "./student.service";

@Controller("/student")
export class StudentController {
    instructorservice: any;
    constructor(private studentservice: StudentService) { }
    //--------------------General Part Start--------------------//

    //-----Student Registration-----// 
    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() studentdto: Studentinfo): any {
        return this.studentservice.registration(studentdto);
    }

    // //-----Student Forget Pin-----//
    // @Post("/forgetpin/")
    // forgetpin(@Body() studentdto: ForgetPin): any{
    //     return this.studentservice.forgetpin(studentdto);
    // }

    //-----Student Verify Pin-----//
    // @Post("/verifypin")
    // verifypin(@Body() studentdto: VerifyPin): any{
    //     return this.studentservice.verifypin(studentdto);
    // }

    //--------------------General Part End--------------------//

    //--------------------Student Access Part Start--------------------//

    //-----Instructor Dashboard-----//
    @Get("/dashboard")
    getStudent(): any {
        return this.studentservice.getDashboard();
    }

    //-----Student Edit Profile-----//
    @Patch("/editstudentinfo/:id")
    @UsePipes(new ValidationPipe())
    editInfoByID(@Body() studentdto: Studentinfo, @Param('id', ParseIntPipe) id: number): any {
        return this.studentservice.editInfoByID(studentdto, id);
    }


    // @Post("/addtocartcourse")
    // @UsePipes(new ValidationPipe())
    // insertStudent(@Body() studentdto: Student): any{
    //     return this.studentservice.addtocartCourse(studentdto);
    // }

    // @Post("/courseenroll")
    // @UsePipes(new ValidationPipe())
    // courseEnroll(@Body() studentdto: Course): any{
    //     return this.studentservice.courseEnroll(studentdto);
    // }
    // @Get("/findinstructor/:id")
    // getInstructorByQuery(@Query() qur:any): any{
    //     return this.studentservice.getInstructorByQuery(qur);
    // }

    // @Get("/findinstructor/:id")
    // getInstructorByID(@Param("id") id:number,):any{
    //     return this.studentservice.getInstructorByID(id);
    // }

    // @Put("/updatestudent/:id")
    // updateStudentByID(@Body() studentdto:Student, @Param('id', ParseIntPipe) id: number): any {
    //     return this.studentservice.updateStudentByID(studentdto, id);
    // }

    @Delete("/deletestudent/:id")
    deleteStudentByID(@Param("id", ParseIntPipe) id: number): any {
        return this.studentservice.deleteStudentByID(id);
    }

    @Get('/logout')
    // @UseGuards(AdminSessionGuard)
    logout(@Session() session) {
        if (session.destroy())
            return { message: "Logged out successful" };

        else
            throw new UnauthorizedException("invalid actions");
    }
}