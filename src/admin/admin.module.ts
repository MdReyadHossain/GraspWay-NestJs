import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminEntity } from "./admin.entity";
import { AdminService } from "./admin.service";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity]),
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
    providers:  [AdminService]
})

export class AdminModule {}
