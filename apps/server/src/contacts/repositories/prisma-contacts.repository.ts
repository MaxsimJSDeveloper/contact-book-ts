import { Contact } from '@generated/prisma/client';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';

export abstract class ContactsRepository {
  abstract findAll(): Promise<Contact[]>;
  abstract findById(id: string): Promise<Contact | null>;
  abstract create(data: CreateContactDto): Promise<Contact>;
  abstract update(id: string, data: UpdateContactDto): Promise<Contact>;
  abstract delete(id: string): Promise<Contact>;
}
