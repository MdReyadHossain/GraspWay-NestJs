import * as bcrypt from "bcrypt";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";
import { AdminCatagory, AdminEditProfile, AdminLogin, AdminProfile, AdminVarifyPass } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InstructorEntity } from "src/instructor/instructor.entity";
import { ManagerEntity } from "src/manager/manager.entity";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { CatagoryEntity } from "src/Entities/Catagory/catagory.entity";
import { StudentEntity } from "src/student/student.entity";
import { CourseStudentEntity } from "src/Entities/CourseStudent/coursestudent.entity";

@Injectable()
export class AdminService {
    private pin: number;
    private id: any;

    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
        @InjectRepository(InstructorEntity) private instructorRepo: Repository<InstructorEntity>,
        @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
        @InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
        @InjectRepository(CourseStudentEntity) private courseStudentRepo: Repository<CourseStudentEntity>,
        @InjectRepository(CatagoryEntity) private catagoryRepo: Repository<CatagoryEntity>,
        private readonly mailerService: MailerService
    ) { }


    async addAdmin(admin: AdminProfile) {
        const adminaccount = new AdminEntity();
        adminaccount.admin_name = admin.admin_name;
        adminaccount.phoneNo = admin.phoneNo;
        adminaccount.email = admin.email;
        adminaccount.address = admin.address;
        adminaccount.joiningYear = admin.joiningYear;
        adminaccount.adminImage = admin.adminImage;

        const salt = await bcrypt.genSalt();
        adminaccount.password = await bcrypt.hash(admin.password, salt);

        const isValidName = await this.adminRepo.findOneBy({ admin_name: admin.admin_name });
        const isValidEmail = await this.adminRepo.findOneBy({ email: admin.email });

        if (!isValidName && !isValidEmail) {
            await this.adminRepo.save(adminaccount);
            return "Admin successfully added";
        }
        else
            return "Username or Email already been registered!";
    }


    async forgetPassword(acc: any) {
        let user = await this.adminRepo.findOneBy({
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

            return "Varification Code sent to Admin Email."
        }
        catch {
            return "Email not found!";
        }
    }


    async varifyPass(admin: AdminVarifyPass) {
        let isValid = false;
        if (admin.pin == this.pin)
            isValid = true;

        if (isValid) {
            const salt = await bcrypt.genSalt();
            admin.password = await bcrypt.hash(admin.password, salt);
            this.adminRepo.update(this.id, { password: admin.password });
            this.pin = null;
            return "Password reseted!";
        }

        else
            return "Invalid or expired pin.";
    }

    // ------------------- Admin Related service [Start] ---------------------//    

    async getDashboard(): Promise<any> {
        const studentReg = await this.studentRepo.find({
            select: {
                regitration: true
            },
            where: {
                status: true
            }
        });
        let studentDate = [];
        studentReg.forEach(st => {
            let stdate = new Date(st.regitration);
            studentDate.push({ month: stdate.getMonth(), year: stdate.getFullYear() })
        });

        const instructorReg = await this.instructorRepo.find({
            select: {
                joined_at: true
            },
            where: {
                status: true
            }
        });
        let instructorDate = [];
        instructorReg.forEach(ins => {
            let instdate = new Date(ins.joined_at);
            instructorDate.push({ month: instdate.getMonth(), year: instdate.getFullYear() })
        });

        const coursePurchase = await this.courseStudentRepo.find({
            select: {
                purchased_at: true
            },
            where: {
                status: true
            }
        });
        let courseDate = [];
        coursePurchase.forEach(crs => {
            let crsdate = new Date(crs.purchased_at);
            courseDate.push({ month: crsdate.getMonth(), year: crsdate.getFullYear() })
        });

        const admin = await this.adminRepo.count({});
        const manager = await this.managerRepo.count({ where: { status: true } });
        const instructor = await this.instructorRepo.count({ where: { status: true } });
        const student = await this.studentRepo.count({});
        const course = await this.courseRepo.count({});
        return { admin, manager, instructor, student, course, instructorDate, studentDate, courseDate };
    }

    async getAdminprofile(id: any) {
        const admin = await this.adminRepo
            .createQueryBuilder("admin")
            .select('admin.name')
            .addSelect('admin.email')
            .addSelect('admin.address')
            .addSelect('admin.phoneNo')
            .addSelect('admin.joiningYear')
            .where('admin.id = :id', { id: id })
            .getOne();

        return admin;
    }


    async editProfile(id: number, admin: AdminEditProfile) {
        const user = await this.adminRepo.findOne({
            where: {
                id: id
            }
        });

        try {
            if (user) {
                const editProfile = this.adminRepo.update(id, admin);
                return { update: editProfile, image: admin.adminImage };
                // return this.adminRepo.update(id, admin);
            }
            else
                throw new UnauthorizedException("Admin not found");
        }
        catch {
            throw new UnauthorizedException("Admin not found");
        }
    }


    async resetPassword(id: number, admin: AdminProfile) {
        const user = await this.adminRepo.findOne({
            where: {
                id: id
            }
        });

        try {
            if (user) {
                const isValid = await bcrypt.compare(admin.oldPassword, user.password);
                const isSame = admin.oldPassword !== admin.password;

                if (isValid && isSame) {
                    const salt = await bcrypt.genSalt();
                    admin.password = await bcrypt.hash(admin.password, salt);
                    this.adminRepo.update(id, { password: admin.password })
                    return "Password reseted!";
                }

                else if (!isSame)
                    return "Old Password and New Password should not be same!";

                else
                    return "Old Password got wrong!";
            }
            else
                throw new UnauthorizedException("Admin not found");
        }
        catch {
            throw new UnauthorizedException("Admin not found");
        }
    }


    getAdminByid(id): any {
        console.log(`Admin Found!`);
        return this.adminRepo.findOneBy({ id });
    }


    async deleteAdminByID(id: any): Promise<any> {
        const user = await this.adminRepo.findOne({
            where: {
                id: id
            }
        });
        if (user) {
            this.adminRepo.delete(id);
            return "Admin deleted!";
        }
        else
            throw new UnauthorizedException("ID not found");
    }

    // ------------------- Admin Related service [End] ---------------------//


    // ------------------- Manager Related service [Start] ---------------------//

    getmanagers(): any {
        return this.managerRepo.find({
            where: {
                status: true
            }
        });
    }

    approveManagerByAdmin(id: any): any {
        return this.managerRepo.update(id, { status: true });
    }

    async rejectManagerByAdmin(id: any): Promise<any> {
        const user = await this.managerRepo.findOne({
            where: {
                status: false,
                id: id
            }
        })

        if (user)
            return this.managerRepo.delete(id);

        else
            throw new UnauthorizedException("invalid id");
    }

    searchManagerByAdmin(id: any): any {
        return this.managerRepo.find({
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }

    async deleteManagerByID(id: any): Promise<any> {
        const user = await this.managerRepo.findOne({
            where: { id: id },
        })

        if (user)
            return this.managerRepo.delete(id);

        else
            throw new UnauthorizedException("Manager not found");
    }

    // ------------------- Manager Related service [End] ---------------------//


    // ------------------- Instructor Related service [Start] ---------------------//

    getinstructors(): any {
        return this.instructorRepo.find({
            where: { status: true }
        });
    }

    approveInstructorbyAdmin(id: any): any {
        return this.instructorRepo.update(id, { status: true });
    }

    async rejectInstructorbyAdmin(id: any): Promise<any> {
        const user = await this.instructorRepo.findOne({
            where: {
                status: false,
                id: id
            }
        })

        if (user)
            return this.managerRepo.delete(id);

        else
            throw new UnauthorizedException("invalid id");
    }

    searchInstructorbyAdmin(id: any): any {
        return this.instructorRepo.find({
            where: { id: id }
        });
    }

    async deleteInstructorbyAdmin(id: any): Promise<any> {
        const user = await this.instructorRepo.findOne({
            where: { id: id },
            relations: { course: true }
        })

        if (user) {
            // const courses = user.course;

            // if (courses && courses.length > 0) {
            //     await Promise.all(courses.map(course => this.courseRepo.remove(course)));
            // }
            return this.instructorRepo.delete(id);
        }
        else
            throw new UnauthorizedException("Instructor not found");
    }

    searchCoursebyAdmin(id: any): any {
        return this.courseRepo.find({
            where: { id: id },
            relations: {
                instructor: true,
                catagory: true
            },
        });
    }

    courseStatus(id: number): any {
        return this.courseRepo.update(id, { status: true });
    }

    async deleteCourseByAdmin(id: any): Promise<any> {
        const user = await this.courseRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.courseRepo.delete(id);

        else
            throw new UnauthorizedException("Course not found");
    }

    // ------------------- Instructor Related service [End] ---------------------//


    // ------------------- Student Related service [Start] ---------------------//

    getStudent(): any {
        return this.studentRepo.find();
    }

    searchStudentbyAdmin(id: any): any {
        return this.studentRepo.find({
            where: { id: id },
            relations: { coursestudents: true }
        });
    }

    setStudentStatus(id: number, status: boolean): any {
        return this.studentRepo.update(id, { status: status });
    }

    async deleteStudentbyAdmin(id: any): Promise<any> {
        const user = await this.studentRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.studentRepo.delete(id);

        else
            throw new UnauthorizedException("Course not found");
    }

    // ------------------- Student Related service [End] ---------------------//


    // ------------------- Website Related service [Start] ---------------------//

    getCatagory(catagoryOrder: any): any {
        if (catagoryOrder == "" || catagoryOrder == "ASC")
            return this.catagoryRepo.find({
                order: {
                    Catagoryname: "ASC"
                }
            });

        else if (catagoryOrder === "DESC") {
            return this.catagoryRepo.find({
                order: {
                    Catagoryname: "DESC"
                }
            });
        }
        return this.catagoryRepo.find();
    }

    addCatagory(cat: AdminCatagory): any {
        const catag = new CatagoryEntity()
        catag.Catagoryname = cat.name;
        return this.catagoryRepo.save(catag);
    }

    async customizeCatagory(id: number, cat: AdminCatagory): Promise<any> {
        const user = await this.catagoryRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.catagoryRepo.update(id, { Catagoryname: cat.name });
        else
            throw new UnauthorizedException("Catagory not found");
    }

    async deleteCatagory(id: number): Promise<any> {
        const user = await this.catagoryRepo.findOne({
            where: { id: id }
        })

        if (user)
            return this.catagoryRepo.delete(id);

        else
            throw new UnauthorizedException("Catagory not found");
    }

    // ------------------- Website Related service [End] ---------------------//
}
