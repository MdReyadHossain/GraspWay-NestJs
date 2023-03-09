import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InstructorModule } from './instructor/instructor.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './Entities/Course/course.module';
import { CatagroyModule } from './Entities/Catagory/catagory.module';


@Module({
  imports: [InstructorModule, AdminModule, StudentModule, CourseModule, CatagroyModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'satao.db.elephantsql.com',
      port: 5432,
      username: 'zstnnmsu',
      password: 'U_OP-727SHwzfCwxVnwQBvspwkwvQj8w',
      database: 'zstnnmsu',
      autoLoadEntities: true,
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
