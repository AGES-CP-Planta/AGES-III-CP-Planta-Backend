import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import detect from 'detect-port';
import { AllExceptionsFilter } from './config/exceptions.js';
import { ResponseFormatInterceptor } from './config/interceptor.response.js';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const defaultPort = parseInt(process.env.PORT || '3000', 10);
  let port = defaultPort;
  
  try {
    if (process.env.NODE_ENV === 'production') {
      port = defaultPort;
      logger.log(`Starting server in production mode on port ${port}`);
    } else {
      port = await detect(defaultPort);
      if (port !== defaultPort) {
        logger.warn(`Port ${defaultPort} is already in use. Using port ${port}.`);
      }
    }

    const app = await NestFactory.create(AppModule);

    // Configure CORS with dynamic origins
    const corsOrigins = [
      'https://cpplanta.duckdns.org',
      'https://api.cpplanta.duckdns.org',
    ];

    // Add development origins when not in production
    if (process.env.NODE_ENV !== 'production') {
      corsOrigins.push('http://localhost:3001');
      corsOrigins.push('http://localhost:3000');
      // Add any other development URLs you need
      // You can also read from environment variables
      if (process.env.ADDITIONAL_CORS_ORIGINS) {
        corsOrigins.push(...process.env.ADDITIONAL_CORS_ORIGINS.split(','));
      }
    }

    app.enableCors({
      origin: corsOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: '*',
      exposedHeaders: '*',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true
    });

    app.enableVersioning({
      type: VersioningType.HEADER,
      header: 'API-Version'
    });

    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new ResponseFormatInterceptor());

    const config = new DocumentBuilder()
      .setTitle('CP-Planta API Documentation')
      .setDescription('API for CP-Planta application')
      .setVersion('1.0')
      .addBearerAuth() // Add this if you're using JWT auth
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
    // Log startup information
    logger.log(`Application starting on port ${port}`);
    logger.log(`Database host: ${process.env.DB_HOST}`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
    
    await app.listen(port, '0.0.0.0'); // Listen on all interfaces (important for Docker)
    logger.log(`Application started successfully on port ${port}`);
  } catch (err) {
    logger.error('Error starting server', err);
    // In production, we may want to exit so the container can restart
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

(async () => {
  await bootstrap();
})();