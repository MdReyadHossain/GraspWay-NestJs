import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "src/manager/manager.entity";
import { ManagerService } from "src/manager/manager.service";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { AdminService } from "./admin.service";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity, ManagerEntity]),
                MailerModule.forRoot({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 465,
                        ignoreTLS: true,
                        secure: true,
                        auth: {
                            user: 'blazeaxelspy@gmail.com',
                            pass: 'tjnadpxurnrlqzff'
                        },
                    }
                }),
            ],
    controllers:[AdminController],
    providers:  [AdminService, ManagerService]
})

export class AdminModule {}
