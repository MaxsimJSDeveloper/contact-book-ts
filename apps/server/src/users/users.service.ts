import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@generated/prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserData,
  UsersRepository,
} from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  sanitizeUser(user: User) {
    const { password, twoFactorSecret, ...safeUser } = user;
    return safeUser;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  async createUser(data: CreateUserData) {
    return this.usersRepository.create(data);
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    const updated = await this.usersRepository.update(id, dto);
    return this.sanitizeUser(updated);
  }

  async deleteUser(id: string) {
    await this.findById(id);
    const deleted = await this.usersRepository.delete(id);
    return this.sanitizeUser(deleted);
  }

  async registerFailedAttempt(userId: string) {
    return this.usersRepository.incrementFailedAttempts(userId);
  }

  async resetSecurityLock(userId: string) {
    return this.usersRepository.resetFailedAttempts(userId);
  }

  async lockUserAccount(userId: string, lockedUntil: Date) {
    return this.usersRepository.lockAccount(userId, lockedUntil);
  }
}
