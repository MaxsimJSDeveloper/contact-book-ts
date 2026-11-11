import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContacts() {
    return this.prisma.contact.findMany();
  }

  async createContact(dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: dto,
    });
  }

  async updateContact(id: string, dto: UpdateContactDto) {
    return this.prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async deleteContact(id: string) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
