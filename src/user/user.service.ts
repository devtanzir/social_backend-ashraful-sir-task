import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}
    async findAll() {
        return await this.prisma.user.findMany()
    }

    async create (data) {
        return await this.prisma.user.create({
            data: data
        })
    }
}
