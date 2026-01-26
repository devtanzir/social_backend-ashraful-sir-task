import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}
    async findAll() {
        return await this.prisma.user.findMany()
    }

    async findOne(id: number) {
        return await this.prisma.user.findUnique({
            where: {id: +id}
        })
    }

    async create (createUserDto:CreateUserDto) {
        return await this.prisma.user.create({
            data: createUserDto
        })
    }

    async update (id: number, updateUserDto:UpdateUserDto) {
        return await this.prisma.user.update({
            where: {id: +id},
            data: updateUserDto
        })
    }

    async delete (id: number) {
        return await this.prisma.user.delete({
            where: {id: +id}
        })
    }
}
