import { HttpException } from '@nestjs/common';

export interface StorageRepository {
  uploadFile(file: Express.Multer.File): Promise<String | HttpException>;
}
