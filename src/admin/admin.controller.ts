import { ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param, Patch, Delete, Session, UseGuards } from "@nestjs/common/decorators";
import { SessionGuard } from "./session.guard";
import { AdminLogin, AdminProfile } from "./admin.dto";
import { AdminService } from "./admin.service";
import { UnauthorizedException } from '@nestjs/common/exceptions';

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
            session.establishment = admin.establishment;
            return {message: "Login Succesful!"};
        }
        else {
            return {message: "Username or Password Invalid!"};
        }
    }

    // pin sent to email with smtp service
    @Post("/forgetpassword/")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body() acc: any): any {
        return this.adminservice.forgetPassword(acc);
    }

    // varify the varification pin and reset password (forgetpassword)
    @Patch("/varifypass")
    varifyPass(@Body() admin: any): any {
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
        return this.adminservice.getAdminByid(id);
    }

    @Delete("/deleteAdmin/:id")
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

    @Post("/addManager/")
    addManagerbyAdmin(@Body() manag: any): any {
        return this.adminservice.addManagerByAdmin(manag);
    }

    @Get("/searchManager/:id")
    searchManagerbyAdmin(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.searchManagerByAdmin(id);
    }

    @Get("/managerPermission/")
    managerPermissionByAdmin(@Body() manag: any): any {
        return this.adminservice.managerPermissionByAdmin(manag);
    }

    @Delete("/deleteManager/:id")
    deleteManagerbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteManagerByID(id);
    }

// ------------------- Manager Related Routes [End] ---------------------//



// ------------------- Instructor Related Routes [Start] ---------------------//

@Post("/addInstructor/")
    addInstructorbyAdmin(@Body() manag: any): any {
        return this.adminservice.addInstructorbyAdmin(manag);
    }

// ------------------- Instructor Related Routes [End] ---------------------//



}
