import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactsRepository } from './prisma-contacts.repository';

@Injectable()
export class PrismaContactsRepository extends ContactsRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll() {
    return this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.contact.findUnique({
      where: { id },
    });
  }

  async create(data: CreateContactDto) {
    return this.prisma.contact.create({
      data,
    });
  }

  async update(id: string, data: UpdateContactDto) {
    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
