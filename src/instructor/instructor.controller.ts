import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Query, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Verify } from "crypto";
import session from "express-session";
import { diskStorage } from "multer";
import { Studentinfo } from "src/student/student.dto";
import { Course, EditInfo, FileUpload, ForgetPin, InstructorEdit, InstructorLogin, InstructorReg, ResetPassword, VerifyPin } from "./instructor.dto";
import { InstructorService } from "./instructor.service";
import { InstructorSessionGuard } from "./session.guard";
import * as fs from 'fs';

@Controller("/instructor")
export class InstructorController {
    constructor(private instructorservice: InstructorService) { }

    //--------------------General Part Start--------------------//

    //-----Instructor Registration-----//
    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() instructordto: InstructorReg): any {
        return this.instructorservice.registration(instructordto);
    }

    //-----Instructor Login-----//
    @Post("/login")
    @UsePipes(new ValidationPipe())
    async login(@Body() instructordto: InstructorLogin, @Session() session) {
        if (await this.instructorservice.login(instructordto)) {
            session.instructor_name = instructordto.instructor_name;
            return session.instructor_name + " Login Successfull!";
        }

        else {
            return `Invalid Instructor Name or Password.`;
        }
    }

    //-----Instructor Forget Pin-----//
    @Post("/forgetpin/")
    forgetpin(@Body() instructordto: ForgetPin): any {
        return this.instructorservice.forgetpin(instructordto);
    }

    //-----Instructor Verify Pin-----//
    @Post("/verifypin")
    verifypin(@Body() instructordto: VerifyPin): any {
        return this.instructorservice.verifypin(instructordto);
    }

    //--------------------General Part End--------------------//

    //--------------------Instructor Access Part Start--------------------//

    //-----Instructor Dashboard-----//
    @Get("/dashboard")
    @UseGuards(InstructorSessionGuard)
    getInstructor(): any {
        return this.instructorservice.getDashboard();
    }

    @Get("/profile/:id")
    // @UseGuards(InstructorSessionGuard)
    getProfile(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.getProfile(id);
    }

    //-----Instructor Edit Profile-----//
    @Patch("/editinstructorinfo/:id")
    @UseGuards(InstructorSessionGuard)
    @UsePipes(new ValidationPipe())
    editInfoByID(@Body() instructordto: EditInfo, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.editInfoByID(instructordto, id);
    }

    //-----Instructor Profile Update-----//
    @Put("/updateinstructorinfo/:id")
    @UseGuards(InstructorSessionGuard)
    @UsePipes(new ValidationPipe())
    updateInstructorByID(@Body() instructordto: InstructorEdit, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.updateInstructorByID(instructordto, id);
    }

    //-----Instructor Password Reset-----//
    @Patch("/resetpassword/:id")
    @UseGuards(InstructorSessionGuard)
    @UsePipes(new ValidationPipe())
    resetPasswordByID(@Body() instructordto: ResetPassword, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.resetPasswordByID(instructordto, id);
    }

    //-----Instructor Search By ID-----//
    @Get("/searchinstructor/:id")
    searchInstructorByID(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.searchInstructorByID(id);
    }



    //-----Show All Student-----//
    @Get("/student/")
    getStudents(): any {
        return this.instructorservice.getStudents();
    }

    //-----Approve Student Request for Purchese Course-----//
    @Post("/student/approvestudent/:id")
    @UsePipes(new ValidationPipe())
    approveStudentinCourse(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.approveStudentinCourse(id);
    }

    //-----Reject Student Request for Purchese Course-----//
    @Delete("/student/rejectstudent/:id")
    rejectStudentByInstructor(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.rejectStudentByInstructor(id);
    }


    //-----Find Student By ID-----//
    @Get("/student/findstudent/:id")
    getStudentByID(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.getStudentByID(id);
    }

    //-----Find Student By Course ID-----[ERROR]//
    @Get("/student/findstudentbycourse/:id")
    getStudentsByCourseID(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.getStudentsByCourseID(id);
    }


    //-----Delete Instructor-----//
    @Delete("/deleteinstructor/:id")
    @UseGuards(InstructorSessionGuard)
    deleteInstructorByID(@Param("id", ParseIntPipe) id: number): any {
        return this.instructorservice.deleteInstructorByID(id);
    }

    //-----Instructor Logout-----//
    @Get('/logout')
    @UseGuards(InstructorSessionGuard)
    logout(@Session() session) {
        if (session.destroy())
            return { message: "Logged out successful" };

        else
            throw new UnauthorizedException("invalid actions");
    }

    //--------------------Instructor Access Part End--------------------//

    //--------------------Course Related Part Start--------------------//

    //-----Add Course-----//
    @Post("/insertcourse")
    @UsePipes(new ValidationPipe())
    insertCourse(@Body() instructordto: Course): any {
        return this.instructorservice.insertCourse(instructordto);
    }

    //-----Upload Course Content-----//
    @Post('/uploadfile')
    @UseInterceptors(FileInterceptor('myfile', {
        storage: diskStorage({
            destination: './data/uploadedfile',
            filename: function (req, file, cb) {
                cb(null, Date.now() + "_Instructor" + file.originalname)
            }
        })
    }))
    FileUpload(@Body() fileuploaddto: FileUpload, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 10000000 }),
            new FileTypeValidator({ fileType: 'png|jpg|jpeg|pdf|doc|docx|' }),
        ],
    }),) myfile: Express.Multer.File) {
        fileuploaddto.filename = myfile.filename;
        return this.instructorservice.FileUpload(fileuploaddto);
    }



    //-----Delete Course Content-----//
    @Delete("/deletecoursecontent/:id")
    //@UseGuards(SessionGuard)
    deletecoursecontent(@Param('id', ParseIntPipe) id: any): any {
        return this.instructorservice.deletecoursecontent(id);
    }


    //-----Certification-----//
    @Get("/certificate/:id")
    async getCertificateByID(@Res() res, @Param('id') id: any) {
        try {
            const filename = await this.instructorservice.getCertificateByID(id);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            const fileStream = fs.createReadStream(filename);
            fileStream.pipe(res);
        }
        catch (error) {
            console.error(error);
            return "PDF Can Not Generated!";
        }
    }

    //--------------------Course Related Part End--------------------//

    //--------------------Others Start--------------------//

    //-----Query-----//

    //--------------------Others End--------------------//

}
