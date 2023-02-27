import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminLogin, AdminProfile } from "./admin.dto";
import { AdminEntity } from "./admin.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
    ) {}
    
    addAdmin(admin: AdminProfile): any {
        const adminaccount = new AdminEntity();
        adminaccount.name = admin.name;
        adminaccount.phoneNo = admin.phoneNo;
        adminaccount.email = admin.email;
        adminaccount.address = admin.address;
        adminaccount.establishment = admin.establishment;
        adminaccount.password = admin.password;
        return this.adminRepo.save(adminaccount);
    }

    loginAdmin(admin: AdminLogin): any {
        return "Username or Password invalid!";
    }

    forgetPassword(admin: AdminProfile): any {
        return `Your Password is ${admin.password}\nDon't share with anyone!`;
    }

    getDashboard(student, instructor, manager): any {
        return `Admin Dashboard\n\nStudent: ${student},\nInstructor: ${instructor}, \nManager: ${manager}`;
    }

    editProfile(id: number, admin: AdminProfile): any {
        return this.adminRepo.update(id, admin);
    }

    resetPassword(id: number, admin: AdminProfile): any {
        this.adminRepo.update(id, {password: admin.password} );
        return "Password reseted!";
    }

    getAdminbyid(id): any {
        console.log(`Admin Found!`)
        return this.adminRepo.findOneBy({ id });
    }

    deleteAdminbyID(id: any): any {
        this.adminRepo.delete(id);
        return "Admin deleted!";
    }
}
