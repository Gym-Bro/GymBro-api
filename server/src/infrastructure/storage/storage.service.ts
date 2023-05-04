import { HttpException, Injectable } from '@nestjs/common';
import { StorageFirebaseRepository } from 'infrastructure/firebase/repositories/storageFirebaseRepository';

@Injectable()
export class StorageService {
  constructor(private readonly storageRepository: StorageFirebaseRepository) {}
  async uploadFile(file): Promise<string | HttpException> {
    return await this.storageRepository.uploadFile(file);
  }
}
