import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminProfile } from "./admin.dto";
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

    loginAdmin(): any {
        return "Login successfully";
    }

    getDashboard(student, instructor, manager): any {
        return `Admin Dashboard\n\nStudent: ${student},\nInstructor: ${instructor}, \nManager: ${manager}`;
    }

    editProfile(admin: AdminProfile): any {
        return `Profile Updated:
                Name: ${admin.name}
                Email: ${admin.email} 
                Phone Number: ${admin.phoneNo} 
                Address: ${admin.address}
                Establishment: ${admin.establishment}
                `;
    }

    forgetPassword(admin: AdminProfile): any {
        return `Your Password is ${admin.password}\nDon't share with anyone!`;
    }

    resetPassword(pass): any {
        return "Password reseted!";
    }
}
