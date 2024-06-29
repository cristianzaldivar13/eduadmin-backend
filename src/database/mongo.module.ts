// src/database/mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/usuarios'),
    MongooseModule.forRoot('mongodb://localhost:27017/asistencias'),
  ],
})
export class MongoModule {}
