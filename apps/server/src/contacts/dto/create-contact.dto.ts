// src/contacts/dto/create-contact.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { ContactType } from '../../generated/prisma/enums';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Contact name is a required field' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is a required field' })
  phoneNumber!: string;

  @IsEmail({},{ message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsEnum(ContactType)
  @IsOptional()
  contactType?: ContactType;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
