import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from '@google-cloud/firestore';

@Injectable()
export abstract class IEntity {
  public uuid: string = null;
  public created_date: Timestamp = null;
  public updated_date: Timestamp = null;

  constructor() {
    this.uuid = uuidv4();
    this.created_date = Timestamp.now();
    this.updated_date = Timestamp.now();
  }

  public getCreatedDate() {
    return this.created_date.toDate();
  }

  public getUpdatedDate() {
    return this.updated_date.toDate();
  }

  public putUpdatedDate(): void {
    this.updated_date = Timestamp.now();
  }
}
