import { Module } from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import { FaceRecognitionController } from './face-recognition.controller';
import { MongoModule } from '../database/mongo.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongoModule,
    FaceRecognitionModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FaceRecognitionController],
  providers: [FaceRecognitionService],
})
export class FaceRecognitionModule {}
