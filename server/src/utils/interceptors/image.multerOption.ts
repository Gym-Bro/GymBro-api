import { HttpException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const imageMulterOption: MulterOptions = {
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype))
      return cb(null, true);
    else
      return cb(
        new HttpException('Only JPEG and PNG files are allowed', 400),
        false,
      );
  },
};
