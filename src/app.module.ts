import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstructorModule } from './instructor/instructor.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './Entities/Course/course.module';
import { CatagroyModule } from './Entities/Catagory/catagory.module';
import { ManagerModule } from './manager/manager.module';
import { CourseStudentModule } from './Entities/CourseStudent/coursestudent.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [InstructorModule, AdminModule, StudentModule, ManagerModule, CourseModule, CatagroyModule, CourseStudentModule,
    TypeOrmModule.forRoot({
      // type: 'postgres',
      // host: 'satao.db.elephantsql.com',
      // port: 5432,
      // username: 'zstnnmsu',
      // password: 'U_OP-727SHwzfCwxVnwQBvspwkwvQj8w',
      // database: 'zstnnmsu',
      // autoLoadEntities: true,
      // synchronize: true,

      //-----------x------------\\
      
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
