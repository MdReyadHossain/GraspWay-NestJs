import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InstructorModule } from './instructor/instructor.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './Entities/Course/course.module';
import { CatagoryModule } from './Entities/Catagory/catagory.module';
import { CourseStudentModule } from './Entities/CourseStudent/coursestudent.module';


@Module({
  imports: [InstructorModule, AdminModule, StudentModule, CourseModule, CatagoryModule, CourseStudentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'satao.db.elephantsql.com',
      port: 5432,
      username: 'zstnnmsu',
      password: 'U_OP-727SHwzfCwxVnwQBvspwkwvQj8w',
      database: 'zstnnmsu',
      autoLoadEntities: true,
      synchronize: true,

      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'finix',
      // database: 'GraspWay',
      // autoLoadEntities: true,
      // synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
