import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from '@google-cloud/firestore';

@Injectable()
export abstract class IEntity {
  public uid: string;
  public created_date: string;
  public updated_date: string;

  constructor() {
    this.uid = uuidv4();
    this.created_date = new Date().toISOString();
    this.updated_date = new Date().toISOString();
  }

  // public getCreatedDate() {
  //   return this.created_date.toDate();
  // }

  // public getUpdatedDate() {
  //   return this.updated_date.toDate();
  // }

  // public setUpdatedDate(): void {
  //   this.updated_date = new Date().toISOString();
  // }
}
