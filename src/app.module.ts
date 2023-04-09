import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // this permit or allow to can use environment variables
    CommentsModule, AppointmentModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
