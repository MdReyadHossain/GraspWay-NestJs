import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminLogin, AdminProfile } from "./admin.dto";
import { AdminEntity } from "./admin.entity";

@Injectable()
export class AdminService {
    private pin: number;
    private id: any;

    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        private readonly mailerService: MailerService
    ) {}
    
    
    async addAdmin(admin: AdminProfile) {
        const adminaccount = new AdminEntity();
        adminaccount.name = admin.name;
        adminaccount.phoneNo = admin.phoneNo;
        adminaccount.email = admin.email;
        adminaccount.address = admin.address;
        adminaccount.establishment = admin.establishment;

        const salt = await bcrypt.genSalt();
        adminaccount.password = await bcrypt.hash(admin.password, salt);

        const isValidName = await this.adminRepo.findOneBy({ name: admin.name });
        const isValidEmail = await this.adminRepo.findOneBy({ email: admin.email });

        if(!isValidName && !isValidEmail) {
            await this.adminRepo.save(adminaccount);
            return "Admin successfully added";
        }
        else
            return "Username or Email already been registered!";
    }


    async loginAdmin(admin: AdminLogin) {
        const user = await this.adminRepo.findOneBy({
            name: admin.name
        });
        if(admin.password == user.password)
            return "Login Successful!";
        
        else {
            const isValid = await bcrypt.compare(admin.password, user.password);

            if(isValid) 
                return "Login Successful!";
            
            else if(!isValid)
                return "Username or Password invalid!";
        }
        
    }


    async forgetPassword(acc: any) {
        let user = await this.adminRepo.findOneBy({
            email: acc.email
        });

        if(user) {
            this.id = user.id;
            console.log(`ID is ${this.id}`);

            this.pin = Math.floor(100000 + Math.random() * 900000);
            await this.mailerService.sendMail({
                to: acc.email,
                subject: `Reset password Instruction from GraspWay`,
                text: `Let's reset your password\nG-${this.pin} is you varification code\n\n*Don't share with anyone.`,
            });
            console.log(this.pin);

            return "Varification Code sent to Admin Email."
        }

        else
            return "Email not found!"
    }


    async varifyPass(admin: any) {
        let isValid = false;
        if(admin.pin == this.pin)
            isValid = true;

        if(isValid) {
            this.adminRepo.update(this.id, {password: admin.password} );
            this.pin = null;
            return "Password reseted!";
        }

        else
            return "Invalid or expired pin.";
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
