import {
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
    INestApplication,
  } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class PrismaService
    extends PrismaClient
    implements OnModuleDestroy, OnModuleInit
  {
    constructor(config: ConfigService) {
      super({
        datasources: {
          db: {
            url: config.getOrThrow<string>('database.url')
          },
        },
      });
    }
  
    onModuleInit(): Promise<void> {
      return this.$connect();
    }
  
    onModuleDestroy(): Promise<void> {
      return this.$disconnect();
    }
  
    enableShutdownHooks(app: INestApplication): void {
      return this.$on('beforeExit', app.close);
    }
  }
  