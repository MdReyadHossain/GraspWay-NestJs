import { Body, Controller, Get, Post } from "@nestjs/common";
import { ManagerProfile } from "./manager.dto";
import { ManagerService } from "./manager.service";

@Controller("/manager")
export class ManagerController{
  constructor(private managerservice: ManagerService){}

   // manager dashboard 
  @Get("/dashboard")
  getDashboard(): any{
    return this.managerservice.getDashboard();
  }

  @Post("/registration")
  registration(@Body() manager: ManagerProfile):any{
      return this.managerservice.registration(manager);
  }
}


