import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatagoryEntity } from "src/Entities/Catagory/catagory.entity";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { InstructorEntity } from "src/instructor/instructor.entity";
import { ManagerEntity } from "src/manager/manager.entity";
import { ManagerService } from "src/manager/manager.service";
import { StudentEntity } from "src/student/student.entity";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { AdminService } from "./admin.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, ManagerEntity, InstructorEntity, StudentEntity, CourseEntity, CatagoryEntity])],
    controllers: [AdminController],
    providers: [JwtService, AdminService, ManagerService]
})

export class AdminModule { }
