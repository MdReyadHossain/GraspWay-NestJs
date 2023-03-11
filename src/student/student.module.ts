import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentController } from "./student.controller";
import { StudentEntity } from "./student.entity";
import { StudentService } from "./student.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule {}