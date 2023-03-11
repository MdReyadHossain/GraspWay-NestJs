import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/admin/admin.entity";
import { ManagerController } from "./manager.controller";
import { ManagerEntity } from "./manager.entity";
import { ManagerService } from "./manager.service";

@Module({
    imports: [TypeOrmModule.forFeature([ManagerEntity, AdminEntity])],
    controllers:[ManagerController],
    providers: [ManagerService],
})

export class ManagerModule {}