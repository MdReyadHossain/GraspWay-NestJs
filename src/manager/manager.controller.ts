import { Controller, Get } from "@nestjs/common";
import { ManagerService } from "./manager.service";

@Controller("/manager")
export class ManagerController{
  constructor(private managerservice: ManagerService){}

  @Get("/dashboard")
  getDashboard(): any{
    return this.managerservice.getDashboard();
  }
}


