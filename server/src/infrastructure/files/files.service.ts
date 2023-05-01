import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { filesConfig } from 'utils/config/files.config';

@Injectable()
export class FilesService {
  async processFile(
    filename: string,
    file: Express.Multer.File,
  ): Promise<void> {
    const readStream = createReadStream(file.path);
    const writeStream = createWriteStream(filesConfig.storage.destination);

    await new Promise<void>((resolve, reject) => {
      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
      readStream.pipe(writeStream);
    });

    console.log(`File ${filename} uploaded succesfully.`);
  }
}
