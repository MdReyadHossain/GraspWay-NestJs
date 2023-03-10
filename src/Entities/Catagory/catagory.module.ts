import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CourseEntity } from "../Course/course.entity";
import { CatagoryEntity } from "./catagory.entity";


@Module({
    imports: [TypeOrmModule.forFeature([CatagoryEntity, CourseEntity])],
})

export class CatagoryModule {}