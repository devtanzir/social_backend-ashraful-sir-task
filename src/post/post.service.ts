import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostService {
     constructor(private readonly prisma: PrismaService) {}

/**
   * Create post
   */
  async create(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        content: dto.content,
        image: dto.image,
        userId: dto.userId,
      },
    });
  }


  // Get all posts (feed)
  findAll() {
    return this.prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get single post
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  // Update post
  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);

    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  // Delete post
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.post.delete({
      where: { id },
    });
  }
}
