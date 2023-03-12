import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CustomRequest } from '../auth/types';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  create(@Req() req:CustomRequest,@Body() body: any) {
    const createPost = this.postsService.create(+req.userId, body);
    return 'created'
  }

  @UseGuards(JwtGuard)
  @Get('/getall')
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('/get')
  findOne(@Req() req: CustomRequest) {
    return this.postsService.findByUser(+req.userId);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  async update(@Req() req: CustomRequest, @Param('id') id: string, @Body() body: any): Promise<string> {
    const updatePost = await this.postsService.update(+req.userId,+id, body);
    if(!updatePost){
      return 'wrong post or user'
    }
    return 'updated'
  }

  @Delete('/delete/:id')
  remove(@Req() req: CustomRequest, @Param('id') id: number, @Body() body: any) {
    return this.postsService.delete(+req.userId, +id);
  }
}
