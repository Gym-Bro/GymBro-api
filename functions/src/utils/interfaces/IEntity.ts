import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export abstract class IEntity {
  public uuid: string = null;
  protected created_date: Date = null;
  protected updated_date: Date = null;

  constructor() {
    this.uuid = uuidv4();
    this.created_date = new Date();
    this.updated_date = new Date();
  }

  public getCreatedDate() {
    return this.created_date;
  }

  public getUpdatedDate() {
    return this.updated_date;
  }
}
