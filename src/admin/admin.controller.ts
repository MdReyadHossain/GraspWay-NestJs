import { ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param } from "@nestjs/common/decorators";
import { AdminLogin, AdminProfile } from "./admin.dto";
import { AdminService } from "./admin.service";

@Controller("/admin")
export class AdminController {
    constructor(private adminservice: AdminService){}

    @Post('/addadmin')
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() admin: AdminProfile): any {
        return this.adminservice.addAdmin(admin);
    }

    // login to dashboard
    @Post("/login")
    @UsePipes(new ValidationPipe())
    loginAdmin(
        @Body() login: AdminLogin
    ): any {
        return this.adminservice.loginAdmin();
    }

    // password sent with body key
    @Post("/forgetpassword/")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body("pass", ParseIntPipe) password: AdminProfile): any {
        return this.adminservice.forgetPassword(password);
    }

    // dashboard: showing all status of users
    @Get("/dashboard/")
    getdashboard(
        @Body("student") student: AdminProfile,
        @Body("instructor") instructor: AdminProfile,
        @Body("manager") manager: AdminProfile
        ): any {
        return this.adminservice.getDashboard(student, instructor, manager);
    }

    // edit profile with admin parameter
    @Post("/editProfile/")
    @UsePipes(new ValidationPipe())
    editProfile(
        @Body() admin: AdminProfile
        ): any {
        return this.adminservice.editProfile(admin);
    }
    
    @Post("/resetPassword/")
    resetPassword(@Body("password") pass: AdminProfile): any {
        return this.adminservice.resetPassword(pass);
    }
}
