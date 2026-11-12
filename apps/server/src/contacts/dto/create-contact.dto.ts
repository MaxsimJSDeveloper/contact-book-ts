import { ContactType } from '@/generated/prisma/enums';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsBoolean,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Contact name is a required field' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is a required field' })
  phoneNumber!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @IsEnum(ContactType)
  @IsOptional()
  contactType?: ContactType;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
