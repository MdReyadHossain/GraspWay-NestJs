import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CourseEntity } from "./course.entity";
import { CourseStudentEntity } from "../CourseStudent/coursestudent.entity";
import { CourseContentEntity } from "./content.entity";


@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, CourseStudentEntity, CourseContentEntity])],
})

export class CourseModule {}