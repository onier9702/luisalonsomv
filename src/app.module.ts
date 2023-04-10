import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppointmentModule } from './appointment/appointment.module';
import { CommentsModule } from './comments/comments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // this permit or allow to can use environment variables

    ServeStaticModule.forRoot({
      rootPath: join( __dirname, '..' , '/public/index.html' ),
    }),

    CommentsModule, AppointmentModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
