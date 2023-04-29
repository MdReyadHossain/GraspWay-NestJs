import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ManagerCatagory, ManagerLogin, ManagerProfile, ManagerVarifyPass } from "./manager.dto";
import { ManagerEntity } from "./manager.entity";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { CatagoryEntity } from "src/Entities/Catagory/catagory.entity";
import { AdminEntity } from "src/admin/admin.entity";

@Injectable()
export class ManagerService {
    private pin: number;
    private id: any;

    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
        @InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
        @InjectRepository(CatagoryEntity) private catagoryRepo: Repository<CatagoryEntity>,
        private readonly mailerService: MailerService
    ) { }

    // registration for manager (in)
    async registration(manager: ManagerProfile) {
        const manageraccount = new ManagerEntity();
        manageraccount.manager_name = manager.manager_name;
        manageraccount.password = manager.password;
        manageraccount.phonenumber = manager.phonenumber;
        manageraccount.email = manager.email;
        manageraccount.age = manager.age;
        manageraccount.status = false;

        const salt = await bcrypt.genSalt();
        manageraccount.password = await bcrypt.hash(manager.password, salt);

        const isValidName = await this.managerRepo.findOneBy({ manager_name: manager.manager_name });
        const isValidEmail = await this.managerRepo.findOneBy({ email: manager.email });

        if (!isValidName && !isValidEmail) {
            const admin = await this.adminRepo.findOne({
                select: { id: true },
                where: { id: manager.adminId }
            });

            if (!admin) {
                throw new UnauthorizedException(`Could not find Admin with id ${manager.adminId}`);
            }

            else {
                manageraccount.admin = admin;
                return this.managerRepo.save(manageraccount);
            }
            await this.managerRepo.save(manageraccount);
            return "Manager successfully added";
        }
        else
            return "Username or Email already been registered!";
    }

    // forget password for manager(ad)
    async forgetPassword(acc: any) {
        let user = await this.managerRepo.findOneBy({
            email: acc.email
        });

        try {
            this.id = user.id;
            console.log(`ID is ${this.id}`);

            this.pin = Math.floor(100000 + Math.random() * 900000);
            await this.mailerService.sendMail({
                from: "blazeaxelspy@gamil.com",
                to: acc.email,
                subject: `Reset password Instruction from GraspWay`,
                text: `Let's reset your password\nG-${this.pin} is you varification code\n\n*Don't share with anyone.`,
            });
            console.log(this.pin);

            return "Varification Code sent to Manager Email."
        }
        // return `Your Password is ${manager.password}`;
        catch {
            return "Email not found!";
        }
    }

    async varifyPass(manager: ManagerVarifyPass) {
        let isValid = false;
        if (manager.pin == this.pin)
            isValid = true;

        if (isValid) {
            const salt = await bcrypt.genSalt();
            manager.password = await bcrypt.hash(manager.password, salt);
            this.managerRepo.update(this.id, { password: manager.password });
            this.pin = null;
            return "Password reseted!";
        }

        else
            return "Invalid or expired pin.";
    }


    // dashboard to manager(ad)
    async getDashboard(): Promise<any> {
        const manager = await this.managerRepo.count({});

        return `Welcome To GraspWay\n
              Manager: ${manager}`;
    }




    //update profile for  manager(ad)
    async updateManager(manager: ManagerProfile, id: any): Promise<any> {
        let isVliad = false;
        if (isVliad == false) {
            const passhash = await bcrypt.genSalt();
            manager.password = await bcrypt.hash(manager.password, passhash);
            isVliad = true;

            if (isVliad == true) {
                this.managerRepo.update(manager, id);
                return this.managerRepo.findOneBy({ id: id });
            }
        }
        else {
            return `Manager Information Didn't Updated.`;
        }

    }


    editProfile(id: number, manager: ManagerProfile): any {
        return this.managerRepo.update(id, manager);
    }

    // reset password for manager(ad)
    async resetPassword(id: number, manager: ManagerProfile) {
        const salt = await bcrypt.genSalt();
        manager.password = await bcrypt.hash(manager.password, salt);

        console.log(this.managerRepo.update(id, { password: manager.password }));
        return "Password reseted!";
    }

    // delete manager(ad)
    deleteManagerbyID(id: any): any {
        this.managerRepo.delete(id);
        return "Manager deleted!";

    }

    // search manager(ad)
    async getManagerbyid(id): Promise<any> {
        const data = this.managerRepo.findOneBy({ id });
        return data;
    }

    searchCoursebyManager(id: any): any {
        return this.courseRepo.find({
            where: { id: id },
            relations: {
                instructor: true,
                catagory: true
            },
        });
    }
    //course status for manager
    courseStatus(id: number): any {
        return this.courseRepo.update(id, { status: true });
    }
    //delete course for manager
    async deleteCourseByManager(id: any): Promise<any> {
        const user = await this.courseRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.courseRepo.delete(id);

        else
            throw new UnauthorizedException("Course not found");
    }

    //customizeCatagory 
    async customizeCatagory(id: number, cat: ManagerCatagory): Promise<any> {
        const user = await this.catagoryRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.catagoryRepo.update(id, { Catagoryname: cat.name });
        else
            throw new UnauthorizedException("Catagory not found");
    }
    //delete Catagory
    async deleteCatagory(id: number): Promise<any> {
        const user = await this.catagoryRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.catagoryRepo.delete(id);

        else
            throw new UnauthorizedException("Catagory not found");
    }


}
