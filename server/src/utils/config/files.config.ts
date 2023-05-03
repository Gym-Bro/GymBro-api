import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModuleOptions } from '@nestjs/platform-express';

export const filesConfig: MulterModuleOptions = {
  dest: './uploads',
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const originalName = file.originalname;
      const extension = extname(originalName);
      const timestamp = new Date()
        .toISOString()
        .replace(/:/g, '-')
        .replace(/\./g, '-');
      const newName =
        originalName.replace(extension, '') + '-' + timestamp + extension;
      cb(null, newName);
    },
  }),
};
