import * as bcrypt from "bcrypt";
import { Injectable } from '@nestjs/common';
import { AppLogin } from './app.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin/admin.entity';
import { ManagerEntity } from './manager/manager.entity';
import { InstructorEntity } from './instructor/instructor.entity';
import { StudentEntity } from './student/student.entity';
import { CourseEntity } from './Entities/Course/course.entity';
import { CatagoryEntity } from './Entities/Catagory/catagory.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
        @InjectRepository(InstructorEntity) private instructorRepo: Repository<InstructorEntity>,
        @InjectRepository(StudentEntity) private studentRepo: Repository<StudentEntity>,
        @InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
        @InjectRepository(CatagoryEntity) private catagoryRepo: Repository<CatagoryEntity>,
        private readonly mailerService: MailerService
    ) { }

    getContact(): string {
        return 'Contact';
    }
    getHome(): string {
        return 'Home';
    }

    getHello(): string {
        return 'Hello World!';
    }

    async loginUser(userdto: AppLogin) {
        try {
            const admin = await this.adminRepo.findOneBy({
                admin_name: userdto.username
            });
            const instructor = await this.instructorRepo.findOneBy({
                instructor_name: userdto.username
            });
            const manager = await this.managerRepo.findOneBy({
                manager_name: userdto.username
            });
            const student = await this.studentRepo.findOneBy({
                student_name: userdto.username
            });

            if (admin) {
                if (userdto.password == admin.password)
                    return { isLogin: true, admin: admin, data: "admin" };

                else {
                    const isValid = await bcrypt.compare(userdto.password, admin.password);

                    if (isValid)
                        return { isLogin: true, admin: admin, data: "admin" };

                    else if (!isValid)
                        return { isLogin: false };
                }
            }

            else if (instructor) {
                if (userdto.password == instructor.password)
                    return { isLogin: true, instructor: instructor, data: "instructor" };

                else {
                    const isValid = await bcrypt.compare(userdto.password, instructor.password);

                    if (isValid)
                        return { isLogin: true, instructor: instructor, data: "instructor" };

                    else if (!isValid)
                        return { isLogin: false };
                }
            }

            else if (manager) {
                if (userdto.password == manager.password)
                    return { isLogin: true, manager: manager, data: "manager" };

                else {
                    const isValid = await bcrypt.compare(userdto.password, manager.password);

                    if (isValid)
                        return { isLogin: true, manager: manager, data: "manager" };

                    else if (!isValid)
                        return { isLogin: false };
                }
            }
            else if (student) {
                if (userdto.password == student.password)
                    return { isLogin: true, student: student, data: "student" };

                else {
                    const isValid = await bcrypt.compare(userdto.password, student.password);

                    if (isValid)
                        return { isLogin: true, student: student, data: "student" };

                    else if (!isValid)
                        return { isLogin: false };
                }
            }
        }
        catch {
            return { isLogin: false };
        }
    }
}
