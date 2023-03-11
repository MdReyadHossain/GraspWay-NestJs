import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ManagerProfile } from "./manager.dto";
import { ManagerEntity } from "./manager.entity";
import * as bcrypt from "bcrypt";
import { AdminEntity } from "src/admin/admin.entity";


@Injectable()
export class ManagerService{
  constructor(
    @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>
  ) {}
  
  async registration(manager: ManagerProfile): Promise<any> {
    const manageracc = new ManagerEntity();
      manageracc.name = manager.name;
      manageracc.password = manager.password;
      manageracc.phonenumber = manager.phonenumber;
      manageracc.email = manager.email;
      manageracc.age = manager.age;
      manageracc.status = false;
      
      const passhash = await bcrypt.genSalt();
      manageracc.password = await bcrypt.hash(manager.password, passhash);

      const admin = await this.adminRepo.findOne({
        select: {id: true},
        where: {id: manager.adminId}
      });

      if (!admin) {
        throw new UnauthorizedException(`Could not find Admin with id ${manager.adminId}`);
      }

      else {
        manageracc.admin = admin;
        return this.managerRepo.save(manageracc);
      }
  }

  getDashboard(): string{
    return "Manager Daqshboard!";
  }

  getInstuctorId(id): any{
    return "Student ID is " + id;
  }
}