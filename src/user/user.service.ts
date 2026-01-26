import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all users
   * Simple read operation
   * No try-catch needed (NestJS handles errors globally)
   */
  async findAll() {
    return this.prisma.user.findMany();
  }

  /**
   * Get single user by ID
   * Throws 404 if user not found
   */
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Create new user
   * DTO validation already handled in controller
   */
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  /**
   * Update existing user
   * First checks if user exists
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    // Check existence before update
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  /**
   * Delete user by ID
   * Ensures user exists before delete
   */
  async delete(id: number) {
    // Check existence before delete
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
