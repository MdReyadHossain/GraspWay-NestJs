import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatagoryEntity } from "src/Entities/Catagory/catagory.entity";
import { CourseContentEntity } from "src/Entities/Course/content.entity";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { CourseStudentEntity } from "src/Entities/CourseStudent/coursestudent.entity";
import { StudentEntity } from "src/student/student.entity";
import { InstructorController } from "./instructor.controller";
import { InstructorEntity } from "./instructor.entity";
import { InstructorService } from "./instructor.service";
import { AdminEntity } from "src/admin/admin.entity";

@Module({
    imports: [TypeOrmModule.forFeature(
        [
            AdminEntity,
            InstructorEntity,
            CourseEntity,
            CourseContentEntity,
            StudentEntity,
            CourseStudentEntity,
            CatagoryEntity
        ]
    )],

    controllers: [InstructorController],
    providers: [InstructorService],
})

export class InstructorModule { }