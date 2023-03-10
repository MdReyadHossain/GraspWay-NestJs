import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "src/Entities/Course/course.entity";
import { InstructorController } from "./instructor.controller";
import { InstructorEntity } from "./instructor.entity";
import { InstructorService } from "./instructor.service";

@Module({
    imports: [TypeOrmModule.forFeature([InstructorEntity, CourseEntity])],
    controllers: [InstructorController],
    providers: [InstructorService],
})

export class InstructorModule {}