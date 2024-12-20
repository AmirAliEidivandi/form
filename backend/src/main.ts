import { HttpExceptionFilter } from '@filters/http-exception.filter';
import {
  HttpException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(morgan('dev'));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.use(helmet());
  if (['develop', 'test', 'local'].includes(process.env.NODE_ENV)) {
    const config = new DocumentBuilder()
      .setTitle('Solbing API')
      .setDescription('API for Solbing system - Version 1')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  app.enableCors({
    origin: configService.get<string>('ORIGIN').split(' '),
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new HttpException(
          {
            message: 'Validation failed',
            errors: errors.map((error) => ({
              field: error.property,
              constraints: error.constraints,
            })),
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  const port = configService.get('PORT');
  await app.listen(port, () =>
    console.log(`Application running on port: ${port}`),
  );
}
bootstrap();
