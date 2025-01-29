import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { APP_FILTER } from '@nestjs/core';
import { OtherExceptionFilter } from './common/filters/all-exceptions.filter';
import { WinstonModule } from 'nest-winston';
import { MailModule } from './mail/mail.module';
import * as winston from 'winston';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            schema: 'users',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
        }),
        WinstonModule.forRoot({
          format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
          ),
          transports: [
              new winston.transports.Console(),
              new winston.transports.File({
                  dirname: __dirname + './../log/debug/',
                  filename: 'debug.log',
                  level: 'debug',
              }),
              new winston.transports.File({
                  dirname: __dirname + './../log/info/',
                  filename: 'info.log',
                  level: 'info',
              }),
              new winston.transports.File({
                  dirname: __dirname + './../log/other/',
                  filename: 'warn.log',
                  level: 'warn',
              }),
          ],
      }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: OtherExceptionFilter,
        },
    ],
})
export class AppModule { }
