import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminLogin, AdminProfile } from "./admin.dto";
import { AdminEntity } from "./admin.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        private readonly mailerService: MailerService
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

    async loginAdmin(admin: AdminLogin) {
        let isValid = await this.adminRepo.findOneBy({
            name: admin.name,
            password: admin.password
        });

        if(isValid) 
            return "Login Successful!";
        
        else if(!isValid)
            return "Username or Password invalid!";
    }

    async forgetPassword(acc: any) {
        let isValid = await this.adminRepo.findOneBy({
            email: acc.email
        });

        if(isValid) {
            let pin = Math.floor(100000 + Math.random() * 900000);
            await this.mailerService.sendMail({
                to: acc.email,
                subject: `Reset password Instruction from GraspWay`,
                text: `Let's reset your password\nG-${pin} is you varification code\n\n*Don't share with anyone.`,
            });
            console.log(pin);
            return "Varification Code sent to Admin Email."
        }
        else
            return "Email not found!"
    }

    async varifyPass(pin: any) {
        
    }

    getDashboard(): any {
        return `Admin Dashboard\n\nStudent: ,\nInstructor: , \nManager: `;
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
