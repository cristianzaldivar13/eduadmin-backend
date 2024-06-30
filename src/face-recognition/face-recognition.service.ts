import { Injectable } from '@nestjs/common';
import * as canvas from 'canvas';
import { promises as fs } from 'fs';
import * as path from 'path';
const faceapi = require('face-api.js');

// Sobrescribir los tipos esperados por face-api.js
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas: Canvas as any, Image, ImageData });

@Injectable()
export class FaceRecognitionService {
  constructor() {
    this.loadModels();
  }

  async loadModels() {
    const modelPath = path.join(__dirname, '.', 'models');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  }

  async detectFace(imagePath: string) {
    const img = await canvas.loadImage(imagePath);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    return detections;
  }

  async saveFaceDescriptor(descriptor: Float32Array, label: string) {
    const faceDescriptorsPath = path.join(__dirname, '..', 'data', 'faceDescriptors.json');
    const faceDescriptors = JSON.parse(await fs.readFile(faceDescriptorsPath, 'utf8') || '[]');
    faceDescriptors.push({ label, descriptor: Array.from(descriptor) });
    await fs.writeFile(faceDescriptorsPath, JSON.stringify(faceDescriptors));
  }

  async recognizeFace(imagePath: string) {
    const img = await canvas.loadImage(imagePath);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

    const faceDescriptorsPath = path.join(__dirname, '..', 'data', 'faceDescriptors.json');
    const faceDescriptors = JSON.parse(await fs.readFile(faceDescriptorsPath, 'utf8') || '[]');

    const labeledDescriptors = faceDescriptors.map(fd => {
      return new faceapi.LabeledFaceDescriptors(fd.label, [new Float32Array(fd.descriptor)]);
    });

    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
    const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
    return results;
  }
}
