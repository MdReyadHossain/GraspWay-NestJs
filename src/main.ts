import { NestFactory } from '@nestjs/core';
import express from 'express';
import * as session from 'express-session';
import { AppModule } from './app.module';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'http://localhost:4430',
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    });
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'secret',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 30000
            }
        })
    );
    await app.listen(3000);
}
bootstrap();
