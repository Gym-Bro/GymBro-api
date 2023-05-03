import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesService } from 'infrastructure/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileService: FilesService,
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
  @UseInterceptors(FileInterceptor('file'))
  public async fileUpload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    console.log('file:', file);
    return `File uploaded succesfully.`;
  }
}
