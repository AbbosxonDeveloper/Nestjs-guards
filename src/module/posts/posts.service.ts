import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(userId: number, payload: any): Promise<void> {
    const createPost =await this.prisma.posts.create({data: {
      title: payload.title,
      usersId: userId
    }})
  }

  async findAll(): Promise<Posts[]> {
    const findAllPost = await this.prisma.posts.findMany()
    return findAllPost
  };

  async findByUser(userId: number): Promise<Posts[]> {
    const findUserPost = await this.prisma.posts.findMany({where: {usersId: userId}})
    return findUserPost
  };

  async update(userId: number, id: number, payload: any): Promise<boolean> {
    const findPost = await this.prisma.posts.findFirst({where: {usersId: userId, id}})

    if(!findPost){
      return false
    }

    await this.prisma.posts.update({
      data: {
        title: payload.title
      },
      where: {
        id,
      }
    })
    return true;
  };

  async delete(userId: number, id: number): Promise<string> {
    const findPost = await this.prisma.posts.findFirst({where: {usersId: userId, id}})
    
    if(!findPost){
      return 'cannot find your post'
    }
    await this.prisma.posts.delete({where: {id}})
    return 'deleted';
  };
}
