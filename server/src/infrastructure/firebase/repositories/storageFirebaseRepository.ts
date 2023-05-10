import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { StorageRepository } from 'infrastructure/storage/storage.interface';
import { Storage } from 'firebase-admin/storage';
@Injectable()
export class StorageFirebaseRepository implements StorageRepository {
  private readonly storage: Storage;

  constructor(private readonly firebaseService: FirebaseService) {
    this.storage = this.firebaseService.storage;
  }
  async uploadFile(file: Express.Multer.File): Promise<string | HttpException> {
    const bucket = await this.storage.bucket();

    // bucket
    //   .upload(file.path, {
    //     destination: 'foto.jpg',
    //   })
    //   .then(() => {
    //     console.log('Archivo cargado con éxito en la raíz del almacenamiento');
    //     return `${file.filename} uploaded to the firebase bucket`;
    //   })
    //   .catch((error) => {
    //     console.error('Error al cargar archivo:', error);
    //     return new HttpException('Error al cargar archivo', 500);
    //   });
    return 'File uploaded!';
  }
}
