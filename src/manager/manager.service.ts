import { Injectable } from "@nestjs/common";


@Injectable()

export class ManagerService{
  getDashboard(): string{
    return "Manager Daqshboard!";
  }

  getInstuctorId(id): any{
    return "Student ID is " + id;
  }
}