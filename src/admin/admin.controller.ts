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
    getdashboard(): any {
        return this.adminservice.getDashboard();
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
        return this.adminservice.getAdminByid(id);
    }

    @Delete("/deleteAdmin/:id")
    deleteAdminbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.adminservice.deleteAdminByID(id);
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

    @Put("/editManagerProfile/")
    editManagerProfileByAdmin(
        @Body('id', ParseIntPipe) id: number, 
        @Body() manag: any
        ): any {
        return this.adminservice.editManagerProfileByAdmin(id, manag);
    }

    @Patch("/resetManagerPassword/")
    resetmanagerPassByAdmin(
        @Body('id', ParseIntPipe) id: number, 
        @Body() manag: any
        ): any {
        return this.adminservice.resetManagerPassByAdmin(id, manag);
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
}
