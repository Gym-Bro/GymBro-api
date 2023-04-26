import { IEntity } from '../../../utils/interfaces/IEntity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { HttpException } from '@nestjs/common';
export class Contact extends IEntity {
  title: string = null;
  email: string = null;
  name: string = null;
  body: string = null;

  constructor(contact: CreateContactDto) {
    super();
    this.title = contact.title;
    this.email = contact.email;
    this.name = contact.name;
    this.body = contact.body;
  }
}

export interface ContactRepository {
  findById(uuid: string): Promise<Contact | null>;
  findByEmail(email: string): Promise<Contact | null>;
  create(contact: Contact): Promise<String | HttpException>;
  update(
    uuid: string,
    updateContact: UpdateContactDto,
  ): Promise<Contact | null>;
  delete(uuid: string): Promise<Contact | null>;
}