import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'graspway',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 30000
      }
    }),
  );
  await app.listen(3001);
}
bootstrap();
