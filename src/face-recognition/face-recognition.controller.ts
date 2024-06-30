import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FaceRecognitionService } from './face-recognition.service';

@Controller('face-recognition')
export class FaceRecognitionController {
  constructor(
    private readonly faceRecognitionService: FaceRecognitionService,
  ) {}

  @Post('detect')
  @UseInterceptors(FileInterceptor('file'))
  async detectFace(@UploadedFile() file: Express.Multer.File) {
    const detections = await this.faceRecognitionService.detectFace(file.path);
    return detections;
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async registerFace(
    @UploadedFile() file: Express.Multer.File,
    @Body('nombreArchivo') nombreArchivo: string,
  ) {
    const detections = await this.faceRecognitionService.detectFace(file.path);
    if (detections.length > 0) {
      await this.faceRecognitionService.saveFaceDescriptor(
        detections[0].descriptor,
        nombreArchivo || file.originalname,
      );
      return { message: 'Face registered successfully' };
    } else {
      return { message: 'No face detected' };
    }
  }

  @Post('recognize')
  @UseInterceptors(FileInterceptor('file'))
  async recognizeFace(@UploadedFile() file: Express.Multer.File) {
    const results = await this.faceRecognitionService.recognizeFace(file.path);
    return results;
  }
}
