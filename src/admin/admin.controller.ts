import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminForm } from "./admin.dto";
import { AdminService } from "./admin.service";


@Controller("/admin")
export class AdminController
{ 
  constructor(private adminService: AdminService){}

  @Get("/dashboard")
    getAdmin(): any { 
        return this.adminService.getIndex();
    }
    @Get("/findinstructor/:id")
    getInstructor(@Param("id", ParseIntPipe) id:number,): any {
      return this.adminService.getInstructor(id);
    }


    @Get("/findstudent")
    getStudent(@Query() qry:any): any {
      return this.adminService.getStudent(qry);
    }  

    @Post("/insertinstructor")
    insertInstructor(@Body() mydto:AdminForm): any {
      return this.adminService.insertInstructor(mydto);
    }
  
    @Put("/updateinstructor/:id")
    @UsePipes(new ValidationPipe())
    updateInstructor( 
        @Param("id") id: any,
      @Body("name") name:string, 
      ): any {
    return this.adminService.updateInstructor(name, id);
    }

}