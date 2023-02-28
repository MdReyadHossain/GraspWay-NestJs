import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InstructorModule } from './instructor/instructor.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { ManagerModule } from './manager/manager.module';


@Module({
  imports: [InstructorModule, AdminModule, StudentModule, ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
