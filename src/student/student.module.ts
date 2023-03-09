import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseStudentEntity } from "src/Entities/CourseStudent/coursestudent.entity";
import { StudentController } from "./student.controller";
import { StudentEntity } from "./student.entity";
import { StudentService } from "./student.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, CourseStudentEntity])],
    controllers: [StudentController],
    providers:[StudentService],
})

export class StudentModule {}