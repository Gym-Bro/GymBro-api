import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { filesConfig } from 'utils/config/files.config';

@Module({
  imports: [MulterModule.registerAsync({ useFactory: () => filesConfig })],
  providers: [FilesService],
  exports: [MulterModule, FilesService],
})
export class FilesModule {}
