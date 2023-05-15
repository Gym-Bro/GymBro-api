import { CollectionReference } from 'firebase-admin/firestore';
import { HttpException, Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { UpdateContactDto } from '../../../modules/contact/dto/update-contact.dto';
import {
  Contact,
  ContactRepository,
} from 'modules/contact/entities/contact.entity';

@Injectable()
export class ContactFirebaseRepository implements ContactRepository {
  private readonly contactCollection: CollectionReference;

  constructor(private readonly firebaseService: FirebaseService) {
    this.contactCollection =
      this.firebaseService.firestore.collection('contacts');
  }

  async findById(id: string): Promise<Contact | null> {
    console.log('findById in contact repo!');
    return null;
  }

  async findByEmail(email: string): Promise<Contact | null> {
    console.log('findByEmail in contact repo!');
    return null;
  }

  async create(contact: Contact): Promise<String | HttpException> {
    try {
      const contactObj = Object.assign({}, contact);
      await this.contactCollection.doc(contact.email).set(contactObj);
      return `Contact form ${contact.email} added to database`;
    } catch (error) {
      return error;
    }
  }

  async update(
    uuid: string,
    contact: UpdateContactDto,
  ): Promise<Contact | null> {
    // await this.userCollection.doc(user.id).update(user);
    console.log('update in contact repo!');
    return null;
  }

  async delete(uuid: string): Promise<Contact | null> {
    // await this.userCollection.doc(id).delete();
    console.log('delete in contact repo!');
    return null;
  }
}
