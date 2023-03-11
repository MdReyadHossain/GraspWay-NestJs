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

@Module({
    imports: [TypeOrmModule.forFeature([InstructorEntity, CourseEntity, CourseContentEntity, StudentEntity, CourseStudentEntity, CatagoryEntity]), 
                MailerModule.forRoot({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 465,
                        ignoreTLS: true,
                        secure: true,
                        auth: {
                            user: 'banikparthib401@gmail.com',
                            pass: 'glxlvgeuxdbabzat'
                        },
                    }
                }),
            ],

    controllers: [InstructorController],
    providers: [InstructorService],
})

export class InstructorModule {}