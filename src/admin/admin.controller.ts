import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseIntPipe, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param, Patch, Delete, Session, UseGuards } from "@nestjs/common/decorators";
import { AdminSessionGuard } from "./session.guard";
import { AdminCatagory, AdminLogin, AdminProfile, AdminVarifyPass } from "./admin.dto";
import { AdminService } from "./admin.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AdminEntity } from "./admin.entity";

@Controller("/admin")
export class AdminController {
    constructor(private adminservice: AdminService) { }

    @Post('/addAdmin')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('adminImage', {
        storage: diskStorage({
            destination: './files',
            filename: function (req, file, cb) {
                cb(null, Date.now() + "_" + file.originalname)
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
        let user = await this.adminservice.loginAdmin(admin);
        if (typeof user !== "number") {
            session.Id = user.id;
            session.name = user.name;
            session.address = user.address;
            session.email = user.email;
            session.joiningYear = user.joiningYear;
            session.phoneNo = user.phoneNo;

            return { message: "Login Succesful!" };
        }
        else {
            return { message: "Username or Password Invalid!" };
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
    @UseGuards(AdminSessionGuard)
    getdashboard(): any {
        return this.adminservice.getDashboard();
    }

    @Get("/profile/")
    @UseGuards(AdminSessionGuard)
    getAdminprofile(@Session() session): any {
        return this.adminservice.getAdminprofile(session.Id);
    }

    // edit profile with admin parameter
    @Put("/editProfile/")
    @UseGuards(AdminSessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('adminImage', {
        storage: diskStorage({
            destination: './files',
            filename: function (_req, file, cb) {
                cb(null, Date.now() + "_" + file.originalname)
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
        admin.adminImage = adminImage.filename;
        return this.adminservice.editProfile(id, admin);
    }

    @Patch("/resetPassword/")
    @UseGuards(AdminSessionGuard)
    resetPassword(
        @Session() session,
        @Body() admin: AdminProfile
    ): any {
        return this.adminservice.resetPassword(session.Id, admin);
    }

    @Get("/searchAdmin/:id")
    @UseGuards(AdminSessionGuard)
    getAdminbyid(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.getAdminByid(id);
    }

    @Delete("/deleteAdmin/")
    @UseGuards(AdminSessionGuard)
    deleteAdminbyID(
        @Session() session,
    ): any {
        return this.adminservice.deleteAdminByID(session.Id);
    }

    @Get('/logout')
    @UseGuards(AdminSessionGuard)
    logout(@Session() session) {
        if (session.destroy())
            return { message: "Logged out successful" };

        else
            throw new UnauthorizedException("invalid actions");
    }

    // ------------------- Admin Related Routes [End] ---------------------//



    // ------------------- Manager Related Routes [Start] ---------------------//

    @Get("/manager/")
    @UseGuards(AdminSessionGuard)
    getmanagers(): any {
        return this.adminservice.getmanagers();
    }

    @Patch("/manager/approveManager/:id")
    @UseGuards(AdminSessionGuard)
    approveManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.approveManagerByAdmin(id);
    }

    @Delete("/manager/rejectManager/:id")
    @UseGuards(AdminSessionGuard)
    rejectManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.rejectManagerByAdmin(id);
    }

    @Get("/manager/searchManager/:id")
    @UseGuards(AdminSessionGuard)
    searchManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchManagerByAdmin(id);
    }

    @Delete("/manager/deleteManager/:id")
    @UseGuards(AdminSessionGuard)
    deleteManagerbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteManagerByID(id);
    }

    // ------------------- Manager Related Routes [End] ---------------------//



    // ------------------- Instructor Related Routes [Start] ---------------------//

    @Get("/instructor/")
    @UseGuards(AdminSessionGuard)
    getinstructors(): any {
        return this.adminservice.getinstructors();
    }

    @Patch("/instructor/approveInstructor/:id")
    @UseGuards(AdminSessionGuard)
    approveInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.approveInstructorbyAdmin(id);
    }

    @Delete("/instructor/rejectInstructor/:id")
    @UseGuards(AdminSessionGuard)
    rejectInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.rejectInstructorbyAdmin(id);
    }

    @Get("/instructor/searchInstructor/:id")
    @UseGuards(AdminSessionGuard)
    searchInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchInstructorbyAdmin(id);
    }

    @Delete("/instructor/deleteInstructor/:id")
    @UseGuards(AdminSessionGuard)
    deleteInstructorbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteInstructorbyAdmin(id);
    }

    @Get("/searchCourse/:id")
    @UseGuards(AdminSessionGuard)
    searchCoursebyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchCoursebyAdmin(id);
    }

    @Patch("/courseStatus/")
    @UseGuards(AdminSessionGuard)
    courseStatus(@Body('id', ParseIntPipe) id: number): any {
        return this.adminservice.courseStatus(id);
    }

    @Delete("/deleteCourse/:id")
    @UseGuards(AdminSessionGuard)
    deleteCourseByAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteCourseByAdmin(id);
    }

    // ------------------- Instructor Related Routes [End] ---------------------//



    // ------------------- Student Related Routes [Start] ---------------------//

    @Get("/student/")
    @UseGuards(AdminSessionGuard)
    getStudent(): any {
        return this.adminservice.getStudent();
    }

    @Get("/student/searchStudent/:id")
    @UseGuards(AdminSessionGuard)
    searchStudentbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchStudentbyAdmin(id);
    }

    @Patch("/student/studentStatus/")
    @UseGuards(AdminSessionGuard)
    setStudentStatus(
        @Body('id', ParseIntPipe) id: number,
        @Body() status: boolean
    ): any {
        return this.adminservice.setStudentStatus(id, status);
    }

    @Delete("/student/deleteStudent/:id")
    @UseGuards(AdminSessionGuard)
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
    @UseGuards(AdminSessionGuard)
    @UsePipes(new ValidationPipe())
    customizeCatagory(
        @Body('id', ParseIntPipe) id: number,
        @Body() cat: AdminCatagory
    ): any {
        return this.adminservice.customizeCatagory(id, cat);
    }

    @Delete("/deleteCatagory/:id")
    @UseGuards(AdminSessionGuard)
    deleteCatagory(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteCatagory(id);
    }

    // ------------------- Website Related Routes [End] ---------------------//
}
