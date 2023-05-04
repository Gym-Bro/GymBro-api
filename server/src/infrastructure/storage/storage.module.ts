import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { storageConfig } from 'utils/config/storage.config';
import { FirebaseModule } from 'infrastructure/firebase/firebase.module';

@Module({
  imports: [
    MulterModule.registerAsync({ useFactory: () => storageConfig }),
    FirebaseModule,
  ],
  providers: [StorageService],
  exports: [MulterModule, StorageService],
})
export class StorageModule {}
