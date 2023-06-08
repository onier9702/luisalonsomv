import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppointmentModule } from './appointment/appointment.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(), // this permit or allow to can use environment variables

    ServeStaticModule.forRoot({
      rootPath: join( __dirname, '..' , '/public' ),
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true
    }),

    CommentsModule, 
    AppointmentModule, 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
