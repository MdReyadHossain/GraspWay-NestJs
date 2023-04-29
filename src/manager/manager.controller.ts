import { ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Body, Controller, Get, Post, Put, Param, Patch, Delete, UseGuards, Session, Res } from "@nestjs/common/decorators";
import { ManagerCatagory, ManagerLogin, ManagerProfile, ManagerVarifyPass } from "./manager.dto";
import { ManagerService } from "./manager.service";
import { ManagerSessionGuard } from "./session.guard";

@Controller("/manager")
export class ManagerController {
    constructor(private managerservice: ManagerService) { }

    //registration to dashboard(in)
    @Post("/registration")
    @UsePipes(new ValidationPipe())
    registration(@Body() manager: ManagerProfile): any {
        return this.managerservice.registration(manager);
    }

    //dashboard (ad)
    @Get("/dashboard/")
    @UseGuards(ManagerSessionGuard)
    getdashboard(): any {
        return this.managerservice.getDashboard();
    }

    // forget password (ad)
    @Post("/forgetpassword/")
    @UsePipes(new ValidationPipe())
    forgetPassword(
        @Body(/*"id", ParseIntPipe*/) acc: any): any {
        // return this.managerservice.forgetPassword(acc);
    }

    // varify the varification pin and reset password (forgetpassword)
    @Patch("/varifyPass")
    varifyPass(@Body() manager: ManagerVarifyPass): any {
        return this.managerservice.varifyPass(manager);
    }

    // edit profile (ad)
    @Put("/editProfile/")
    @UseGuards(ManagerSessionGuard)
    @UsePipes(new ValidationPipe())
    editProfile(
        @Body('id', ParseIntPipe) id: number,
        @Body() manager: ManagerProfile
    ): any {
        return this.managerservice.editProfile(id, manager);
    }

    // update profile(in)
    @Put("/updatemanager/:id")
    @UseGuards(ManagerSessionGuard)
    @UsePipes(new ValidationPipe())
    updateManager(@Body() manager: ManagerProfile, @Param('id', ParseIntPipe) id: any): any {
        return this.managerservice.updateManager(manager, id);
    }

    // Reset Password(ad)
    @Patch("/resetPassword/")
    @UseGuards(ManagerSessionGuard)
    resetPassword(
        @Body('id', ParseIntPipe) id: number,
        @Body() manager: ManagerProfile
    ): any {
        return this.managerservice.resetPassword(id, manager);
    }

    // Delete Manager(ad)
    @Delete("deleteManager/:id")
    deleteManagerbyID(@Param('id', ParseIntPipe) id: any): any {
        return this.managerservice.deleteManagerbyID(id);
    }

    // search manager(ad)
    @Get("/searchManager/:id")
    @UseGuards(ManagerSessionGuard)
    getManagerbyid(@Param('id', ParseIntPipe) id: any): any {
        return this.managerservice.getManagerbyid(id);
    }

    //Logout(ad)
    @Get('/logout')
    @UseGuards(ManagerSessionGuard)
    logout(@Session() session) {
        if (session.destroy())
            return { message: "Logged out successful" };

        else
            throw new UnauthorizedException("invalid actions");
    }

    //searchCourse(ad)
    @Get("/searchCourse/:id")
    @UseGuards(ManagerSessionGuard)
    searchCoursebyManager(@Param('id', ParseIntPipe) id: any): any {
        return this.managerservice.searchCoursebyManager(id);
    }

    //courseStatus(ad)
    @Patch("/courseStatus/")
    @UseGuards(ManagerSessionGuard)
    courseStatus(@Body('id', ParseIntPipe) id: number): any {
        return this.managerservice.courseStatus(id);
    }

    //Delete Course(ad)
    @Delete("/deleteCourse/:id")
    @UseGuards(ManagerSessionGuard)
    deleteCourseByManager(@Param('id', ParseIntPipe) id: any): any {
        return this.managerservice.deleteCourseByManager(id);
    }

    //Customized the catagory(ad)
    @Put("/customizeCatagory/")
    @UseGuards(ManagerSessionGuard)
    @UsePipes(new ValidationPipe())
    customizeCatagory(
        @Body('id', ParseIntPipe) id: number,
        @Body() cat: ManagerCatagory
    ): any {
        return this.managerservice.customizeCatagory(id, cat);
    }


    //Delete Catagory(ad)
    @Delete("/deleteCatagory/:id")
    @UseGuards(ManagerSessionGuard)
    deleteCatagory(@Param('id', ParseIntPipe) id: any): any {
        return this.managerservice.deleteCatagory(id);
    }

}
