import { ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param } from "@nestjs/common/decorators";
import { AdminProfile } from "./admin.dto";
import { AdminService } from "./admin.service";

@Controller("/admin")
export class AdminController {
    constructor(private adminservice: AdminService){}

    // login to dashboard
    @Post("/login")
    loginAdmin(): any {
        return this.adminservice.loginAdmin();
    }

    // password sent with body key
    @Get("/forgetpassword/:pass")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body("pass", ParseIntPipe) password: AdminProfile): number {
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
    @Get("/editProfile/:admin")
    editProfile(@Param("admin") admin: AdminProfile): any {
        return this.adminservice.editProfile(admin);
    } 
    
    @Post("/resetPassword/")
    resetPassword(@Body("password") pass: AdminProfile): any {
        return this.adminservice.resetPassword(pass);
    }
}
