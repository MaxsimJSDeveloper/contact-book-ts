import { UpdateUserDto } from '../dto/update-user.dto';
import { Account, User } from '@generated/prisma/client';

export type UserWithAccounts = User & { accounts: Account[] };

export interface CreateUserData {
  email: string;
  name: string;
  password?: string;
  avatarUrl?: string;
  isEmailVerified?: boolean;
}

export interface IUserCredentialsReader {
  findByEmail(email: string): Promise<UserWithAccounts | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
}

export interface IUserSecurityManager {
  incrementFailedAttempts(userId: string): Promise<User>;
  resetFailedAttempts(userId: string): Promise<User>;
  lockAccount(userId: string, lockedUntil: Date): Promise<User>;
}

export abstract class UsersRepository
  implements IUserCredentialsReader, IUserSecurityManager
{
  abstract findByEmail(email: string): Promise<UserWithAccounts | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(data: CreateUserData): Promise<User>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<User>;

  abstract incrementFailedAttempts(userId: string): Promise<User>;
  abstract resetFailedAttempts(userId: string): Promise<User>;
  abstract lockAccount(userId: string, lockedUntil: Date): Promise<User>;
}
