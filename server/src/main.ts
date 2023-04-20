import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Import Swagger related modules

const server = express();
server.use(cors());
server.use(morgan('dev'));

const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Create Swagger documentation with the API routes
  const options = new DocumentBuilder()
    .setTitle('GymBro API')
    .setDescription('By Federico Interlandi Zoireff')
    .setVersion('1.0')
    .addTag('gymbro')
    .addServer('http://localhost:5001/gymbro/us-central1/gymbro_api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  return app.init();
};

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

// Handle OPTIONS requests
server.options('*', cors());

// Serve Swagger UI through the Firebase function
const handler = (req, res) => {
  const url = req.originalUrl;
  if (url.startsWith('/api/docs')) {
    req.url = url.replace('/api/docs', '/api');
  }

  return server(req, res);
};

export const gymbro_api = functions.https.onRequest(handler);
