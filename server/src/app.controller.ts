import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
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
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<string | HttpException> {
    console.log(req.headers);
    return await this.storageService.uploadFile(file);
  }
}
