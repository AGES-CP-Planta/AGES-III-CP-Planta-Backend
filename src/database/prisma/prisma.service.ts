import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  
  constructor() {
    // Check if DATABASE_URL is defined and provide a fallback for development
    const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres';
    
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
      log: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'warn'] : ['error'],
    });

    // Log for debugging in development
    if (process.env.NODE_ENV !== 'production') {
      this.logger.log(`Using database URL: ${databaseUrl.replace(/\/\/.*:.*@/, '//***:***@')}`);
    }
  }

  async onModuleInit() {
    this.logger.log('Connecting to PostgreSQL database...');
    
    try {
      await this.$connect();
      this.logger.log('Successfully connected to PostgreSQL');
    } catch (error) {
      this.logger.error('Failed to connect to PostgreSQL', error);
      // In development, we might want to continue even if DB connection fails
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from PostgreSQL database...');
    await this.$disconnect();
  }
}