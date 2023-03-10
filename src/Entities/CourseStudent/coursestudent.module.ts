import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatagoryEntity } from "../Catagory/catagory.entity";
import { CatagoryModule } from "../Catagory/catagory.module";
import { CourseModule } from "../Course/course.module";
import { CourseStudentEntity } from "./coursestudent.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CatagoryEntity, CourseStudentEntity])],
})

export class CourseStudentModule{}