import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CourseEntity } from "./course.entity";


@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity])],
})

export class CourseModule {}