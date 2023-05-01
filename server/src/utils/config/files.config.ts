import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModuleOptions } from '@nestjs/platform-express';

export const filesConfig: MulterModuleOptions = {
  dest: './uploads',
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
