import { Module } from "@nestjs/common";
// import * as bcrypt from "bcrypt";
import { MailerModule } from "@nestjs-modules/mailer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerController } from "./manager.controller";
import { ManagerEntity } from "./manager.entity";
import { ManagerService } from "./manager.service";
import { StudentEntity } from "src/student/student.entity";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { CatagoryEntity } from "src/Entities/Catagory/catagory.entity";
import { AdminEntity } from "src/admin/admin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity, CourseEntity, CatagoryEntity, AdminEntity,
    MailerModule.forRoot])],
  controllers: [ManagerController],
  providers: [ManagerService]
})

export class ManagerModule {}