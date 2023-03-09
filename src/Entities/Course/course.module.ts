import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CourseEntity } from "./course.entity";
import { CourseStudentEntity } from "../CourseStudent/coursestudent.entity";


@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, CourseStudentEntity])],
})

export class CourseModule {}