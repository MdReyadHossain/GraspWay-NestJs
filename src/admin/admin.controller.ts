import { ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param, Patch, Delete } from "@nestjs/common/decorators";
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
        @Body() admin: AdminLogin
    ): any {
        return this.adminservice.loginAdmin(admin);
    }

    // password sent with body key
    @Post("/forgetpassword/")
    @UsePipes(new ValidationPipe())
    forgetPassword(
        @Body("id", ParseIntPipe) id: number,
        @Body() password: AdminProfile
        ): any {
        return this.adminservice.forgetPassword(id, password);
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
    @Put("/editProfile/")
    @UsePipes(new ValidationPipe())
    editProfile(
        @Body('id', ParseIntPipe) id: number, 
        @Body() admin: AdminProfile
        ): any {
        return this.adminservice.editProfile(id, admin);
    }
    
    @Patch("/resetPassword/")
    resetPassword(
        @Body('id', ParseIntPipe) id: number, 
        @Body() admin: AdminProfile
        ): any {
        return this.adminservice.resetPassword(id, admin);
    }

    @Get("/searchAdmin/:id")
    getAdminbyid(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.getAdminbyid(id);
    }

    @Delete("deleteAdmin/:id")
    deleteAdminbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteAdminbyID(id);
    }
}
