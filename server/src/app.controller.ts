import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageMulterOption } from 'utils/interceptors/image.multerOption';
import { StorageService } from 'infrastructure/storage/storage.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Post('test')
  public test(@Body() body: any) {
    console.log(body);
    return body;
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file', imageMulterOption))
  public async fileUpload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    console.log(file);
    await this.storageService.uploadFile(file);
    return `File uploaded succesfully.`;
  }
}
