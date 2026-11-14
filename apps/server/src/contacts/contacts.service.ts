import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/prisma-contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  async getAllContacts() {
    return this.contactsRepository.findAll();
  }

  async getContactById(id: string) {
    const contact = await this.contactsRepository.findById(id);

    if (!contact) {
      throw new NotFoundException(`Contact with ID "${id}" not found`);
    }

    return contact;
  }

  async createContact(dto: CreateContactDto) {
    return this.contactsRepository.create(dto);
  }

  async updateContact(id: string, dto: UpdateContactDto) {
    await this.getContactById(id);

    return this.contactsRepository.update(id, dto);
  }

  async deleteContact(id: string) {
    await this.getContactById(id);

    return this.contactsRepository.delete(id);
  }
}
