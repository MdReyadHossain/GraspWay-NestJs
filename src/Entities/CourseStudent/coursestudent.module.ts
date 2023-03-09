import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CourseEntity } from "../Course/course.entity";
import { CatagoryEntity } from "../Catagory/catagory.entity";
import { CourseStudentEntity } from "./coursestudent.entity";


@Module({
    imports: [TypeOrmModule.forFeature([CatagoryEntity, CourseStudentEntity])],
})

export class CourseStudentModule {}