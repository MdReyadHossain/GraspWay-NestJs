import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseIntPipe, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param, Patch, Delete, Session, UseGuards } from "@nestjs/common/decorators";
import { SessionGuard } from "./session.guard";
import { AdminCatagory, AdminLogin, AdminProfile, AdminVarifyPass } from "./admin.dto";
import { AdminService } from "./admin.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Student } from "src/student/student.dto";

@Controller("/admin")
export class AdminController {
    constructor(private adminservice: AdminService){}

    @Post('/addAdmin')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('adminImage', {
        storage: diskStorage({
            destination: './files',
            filename: function (req, file, cb) {
                cb(null,Date.now() + "_" +file.originalname)
            }
        })
    }))
    addAdmin(
        @UploadedFile(new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2097152 }),
                    new FileTypeValidator({ fileType: /(png|jpg|jpeg)$/ }),
                ]
            }
        )) adminImage: Express.Multer.File,
        @Body() admin: AdminProfile
        ): any {
        console.log(adminImage);
        admin.adminImage = adminImage.filename;
        return this.adminservice.addAdmin(admin);
    }

    // login to dashboard
    @Post("/login")
    @UsePipes(new ValidationPipe())
    async loginAdmin(
        @Session() session,
        @Body() admin: AdminLogin
    ) {
        // return this.adminservice.loginAdmin(admin);
        if(await this.adminservice.loginAdmin(admin)) {
            session.name = admin.name;
            session.phoneNo = admin.phoneNo;
            session.email = admin.email;
            session.address = admin.address;
            session.joiningYear = admin.joiningYear;
            return {message: "Login Succesful!"};
        }
        else {
            return {message: "Username or Password Invalid!"};
        }
    }

    // pin sent to email with smtp service
    @Post("/forgetPassword/")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body() acc: any): any {
        return this.adminservice.forgetPassword(acc);
    }

    // varify the varification pin and reset password (forgetpassword)
    @Patch("/varifyPass")
    varifyPass(@Body() admin: AdminVarifyPass): any {
        return this.adminservice.varifyPass(admin);
    }



// ------------------- Admin Related Routes [Start] ---------------------//

    // dashboard: show status of all users
    @Get("/dashboard/")
    @UseGuards(SessionGuard)
    getdashboard(): any {
        return this.adminservice.getDashboard();
    }

    // edit profile with admin parameter
    @Put("/editProfile/")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('adminImage', {
        storage: diskStorage({
            destination: './files',
            filename: function (_req, file, cb) {
                cb(null,Date.now() + "_" +file.originalname)
            }
        })
    }))
    editProfile(
        @Session() session,
        @UploadedFile(new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2097152 }),
                    new FileTypeValidator({ fileType: /(png|jpg|jpeg)$/ }),
                ]
            }
        )) adminImage: Express.Multer.File,
        @Body('id', ParseIntPipe) id: number, 
        @Body() admin: AdminProfile
        ): any {
        id = session
        admin.adminImage = adminImage.filename;
        return this.adminservice.editProfile(id, admin);
    }
    
    @Patch("/resetPassword/")
    @UseGuards(SessionGuard)
    resetPassword(
        @Body('id', ParseIntPipe) id: number, 
        @Body() admin: AdminProfile
        ): any {
        return this.adminservice.resetPassword(id, admin);
    }

    @Get("/searchAdmin/:id")
    @UseGuards(SessionGuard)
    getAdminbyid(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.getAdminByid(id);
    }

    @Delete("/deleteAdmin/:id")
    @UseGuards(SessionGuard)
    deleteAdminbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteAdminByID(id);
    }

    @Get('/logout')
    @UseGuards(SessionGuard)
    logout(@Session() session) {
        if(session.destroy())
            return {message: "Logged out successful"};
        
        else
            throw new UnauthorizedException("invalid actions");
    }

// ------------------- Admin Related Routes [End] ---------------------//



// ------------------- Manager Related Routes [Start] ---------------------//

    @Get("/manager/")
    @UseGuards(SessionGuard)
    getmanagers(): any {
        return this.adminservice.getmanagers();
    }

    @Patch("/manager/approveManager/:id")
    @UseGuards(SessionGuard)
    approveManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.approveManagerByAdmin(id);
    }

    @Delete("/manager/rejecteManager/:id")
    @UseGuards(SessionGuard)
    rejecteManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.rejecteManagerByAdmin(id);
    }

    @Get("/manager/searchManager/:id")
    @UseGuards(SessionGuard)
    searchManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchManagerByAdmin(id);
    }

    @Delete("/manager/deleteManager/:id")
    @UseGuards(SessionGuard)
    deleteManagerbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteManagerByID(id);
    }

// ------------------- Manager Related Routes [End] ---------------------//



// ------------------- Instructor Related Routes [Start] ---------------------//

    @Get("/instructor/")
    @UseGuards(SessionGuard)
    getinstructors(): any {
        return this.adminservice.getinstructors();
    }

    @Patch("/instructor/approveInstructor/:id")
    @UseGuards(SessionGuard)
    approveInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.approveInstructorbyAdmin(id);
    }

    @Delete("/instructor/rejectInstructor/:id")
    @UseGuards(SessionGuard)
    rejectInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.rejectInstructorbyAdmin(id);
    }

    @Get("/instructor/searchInstructor/:id")
    @UseGuards(SessionGuard)
    searchInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchInstructorbyAdmin(id);
    }

    @Delete("/instructor/deleteInstructor/:id")
    @UseGuards(SessionGuard)
    deleteInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteInstructorbyAdmin(id);
    }

    @Get("/searchCourse/:id")
    @UseGuards(SessionGuard)
    searchCoursebyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchCoursebyAdmin(id);
    }

    @Patch("/courseStatus/")
    @UseGuards(SessionGuard)
    courseStatus(@Body('id', ParseIntPipe) id: number): any {
        return this.adminservice.courseStatus(id);
    }

    @Delete("/deleteCourse/:id")
    @UseGuards(SessionGuard)
    deleteCourseByAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteCourseByAdmin(id);
    }

// ------------------- Instructor Related Routes [End] ---------------------//



// ------------------- Student Related Routes [Start] ---------------------//

    @Get("/student/")
    @UseGuards(SessionGuard)
    getStudent(): any {
        return this.adminservice.getStudent();
    }

    @Get("/student/searchStudent/:id")
    @UseGuards(SessionGuard)
    searchStudentbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchStudentbyAdmin(id);
    }

    @Patch("/student/studentStatus/")
    @UseGuards(SessionGuard)
    setStudentStatus(
        @Body('id', ParseIntPipe) id: number, 
        @Body() status: boolean
        ): any {
        return this.adminservice.setStudentStatus(id, status);
    }

    @Delete("/student/deleteStudent/:id")
    @UseGuards(SessionGuard)
    deleteStudentbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteStudentbyAdmin(id);
    }

// ------------------- Student Related Routes [End] ---------------------//



// ------------------- Website Related Routes [Start] ---------------------//

    @Post('/addCatagory')
    @UsePipes(new ValidationPipe())
    addCatagory(
        @Body() cat: AdminCatagory
        ): any {
        return this.adminservice.addCatagory(cat);
    }

    @Put("/customizeCatagory/")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    customizeCatagory(
        @Body('id', ParseIntPipe) id: number, 
        @Body() cat: AdminCatagory
        ): any {
        return this.adminservice.customizeCatagory(id, cat);
    }

    @Delete("/deleteCatagory/:id")
    @UseGuards(SessionGuard)
    deleteCatagory(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteCatagory(id);
    }

// ------------------- Website Related Routes [End] ---------------------//
}
