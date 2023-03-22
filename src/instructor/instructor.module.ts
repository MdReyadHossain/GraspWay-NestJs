import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstructorController } from "./instructor.controller";
import { InstructorEntity } from "./instructor.entity";
import { InstructorService } from "./instructor.service";

@Module({
    imports: [TypeOrmModule.forFeature([InstructorEntity])],
    controllers: [InstructorController],
    providers: [InstructorService],
})

export class InstructorModule {}