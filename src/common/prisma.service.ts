import { PrismaClient, Prisma } from '@prisma/client';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  onModuleInit() {
    this.$on('info', (e) => {
      console.log(e);
    });
    this.$on('warn', (e) => {
     console.log(e);
    });
    this.$on('error', (e) => {
      console.log(e);
    });
    this.$on('query', (e) => {
     console.log(e)
    });
  }
}
