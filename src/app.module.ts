import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InstructorModule } from './instructor/instructor.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [InstructorModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
