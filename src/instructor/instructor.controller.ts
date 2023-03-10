import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Put, Query, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Verify } from "crypto";
import session from "express-session";
import { diskStorage } from "multer";
import { Course, EditInfo, FileUpload, ForgetPin, InstructorEdit, InstructorLogin, InstructorReg, ResetPassword, VerifyPin } from "./instructor.dto";
import { InstructorService } from "./instructor.service";
import { SessionGuard } from "./session.guard";

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
    async login(@Body() instructordto: InstructorLogin, @Session() session){
        if(await this.instructorservice.login(instructordto)){
            session.instructorname = instructordto.instructorname;
            session.password = instructordto.password;
            session.email = instructordto.email;
            session.phonenumber = instructordto.phonenumber;
            session.age = instructordto.age;
            session.dob = instructordto.dob;

            return session.instructorname + " Login Successfull!";
        }

        else{
            return `Invalid Instructor Name or Password.`;
        }
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
    @UseGuards(SessionGuard)
    getInstructor(): any{
        return this.instructorservice.getDashboard();
    }

    //-----Instructor Edit Profile-----//
    @Patch("/editinstructorinfo/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    editInfoByID(@Body() instructordto: EditInfo, @Param('id', ParseIntPipe) id: number): any{
        return this.instructorservice.editInfoByID(instructordto, id);
    }

    //-----Instructor Profile Update-----//
    @Put("/updateinstructorinfo/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateInstructorByID(@Body() instructordto: InstructorEdit, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.updateInstructorByID(instructordto, id);
    }

    //-----Instructor Password Reset-----//
    @Patch("/resetpassword/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    resetPasswordByID(@Body() instructordto: ResetPassword, @Param('id', ParseIntPipe) id: number): any {
        return this.instructorservice.resetPasswordByID(instructordto, id);
    }

    //-----Instructor Search-----//
    @Get("/searchinstructor/:id")
    @UseGuards(SessionGuard)
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
    @UseGuards(SessionGuard)
    deleteInstructorByID(@Param("id", ParseIntPipe) id: number): any{
        return this.instructorservice.deleteInstructorByID(id);
    }

    //-----Instructor Logout-----//
    @Get('/logout')
    @UseGuards(SessionGuard)
    logout(@Session() session) {
        if(session.destroy())
            return {message: "Logged out successful"};
        
        else
            throw new UnauthorizedException("invalid actions");
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
    @Post('/uploadfile')
    @UseInterceptors(FileInterceptor('myfile', {
        storage: diskStorage({
            destination: './Uploaded File',
            filename: function(req, file, cb){
                cb(null, Date.now()+ "_" + file.originalname)
            }
        })
    }))
    FileUpload(@Body() fileuploaddto: FileUpload, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 1000000}),
            new FileTypeValidator({fileType: 'png|jpg|jpeg|'}),
        ],
    }),) myfile: Express.Multer.File){
        fileuploaddto.filename = myfile.filename;
        return this.instructorservice.FileUpload(fileuploaddto);
    }
    





    //-----Delete Course Content-----//


    //-----Certification-----//


    //--------------------Course Related Part End--------------------//

    //--------------------Others Start--------------------//

    //-----Query-----//
    
    //--------------------Others End--------------------//

}
