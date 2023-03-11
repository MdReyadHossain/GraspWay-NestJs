import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerController } from "./manager.controller";
import { ManagerEntity } from "./manager.entity";
import { ManagerService } from "./manager.service";

@Module({
    imports: [TypeOrmModule.forFeature([ManagerEntity])],
    controllers:[ManagerController],
    providers: [ManagerService],
})

export class ManagerModule {}