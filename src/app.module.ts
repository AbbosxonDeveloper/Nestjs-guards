import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { PostsModule } from './module/posts/posts.module';


@Module({
  imports: [ConfigModule.forRoot(config), AuthModule,PrismaModule, UsersModule, PostsModule],
})
export class AppModule {}
