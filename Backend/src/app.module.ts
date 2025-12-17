import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://vanshbandwal93:root123@cluster0.0yrafyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
      