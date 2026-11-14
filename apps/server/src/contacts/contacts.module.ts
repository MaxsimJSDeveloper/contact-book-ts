import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsRepository } from './repositories/prisma-contacts.repository';
import { PrismaContactsRepository } from './repositories/contacts.repository';

@Module({
  controllers: [ContactsController],
  providers: [
    ContactsService,
    {
      provide: ContactsRepository,
      useClass: PrismaContactsRepository,
    },
  ],
})
export class ContactsModule {}
