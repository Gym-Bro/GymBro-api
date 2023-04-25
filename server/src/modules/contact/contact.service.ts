import { HttpException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { MailingService } from './../../infrastructure/mailing/mailing.service';
import { MailOptions } from './../../utils/interfaces/IMailing';
import { ContactFirebaseRepository } from 'src/infrastructure/firebase/repositories/contactFirebaseRepository';

@Injectable()
export class ContactService {
  constructor(
    private readonly contactRepository: ContactFirebaseRepository,
    private readonly mailingService: MailingService,
  ) {}

  async create(
    createContactDto: CreateContactDto,
  ): Promise<string | HttpException> {
    //return 'This action adds a new contact';
    try {
      const contact = new Contact(createContactDto);
      await this.contactRepository.create(contact);
      const message: MailOptions = {
        from: contact.email,
        to: 'admin@gymbro.com',
        subject: contact.title,
        text: contact.body,
      };
      await this.mailingService.sendEmail(message);
      return 'Contact form sended to admin succesfully!';
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
