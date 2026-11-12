import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContacts() {
    return this.prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async getContactById(id: string) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID "${id}" not found`);
    }

    return contact;
  }

  async createContact(dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: dto,
    });
  }

  async updateContact(id: string, dto: UpdateContactDto) {
    await this.getContactById(id);

    return this.prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async deleteContact(id: string) {
    await this.getContactById(id);

    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
