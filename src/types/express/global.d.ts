declare module 'face-api.js' {
    interface Environment {
      Canvas: any;
      Image: any;
      ImageData: any;
      Video: any;
      createCanvasElement: any;
      createImageElement: any;
    }
  
    export const env: {
      monkeyPatch: (env: Partial<Environment>) => void;
    };
  }
  