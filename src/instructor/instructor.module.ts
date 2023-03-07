import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstructorController } from "./instructor.controller";
import { InstructorEntity } from "./instructor.entity";
import { InstructorService } from "./instructor.service";

@Module({
    imports: [TypeOrmModule.forFeature([InstructorEntity]),
                MailerModule.forRoot({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 465,
                        ignoreTLS: true,
                        secure: true,
                        auth: {
                            user: 'banikparthib401@gmail.com',
                            pass: 'glxlvgeuxdbabzat'
                        },
                    }
                }),
            ],

    controllers: [InstructorController],
    providers: [InstructorService],
})

export class InstructorModule {}