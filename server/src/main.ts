import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as morgan from 'morgan'; // Import morgan middleware

import { config } from 'dotenv';
import { globalErrorMiddleware } from 'utils/middlewares/globalErrorMiddleware';
config();

const server = express();
server.use(cors());
server.use(morgan('dev')); // Use morgan middleware with 'dev' format
const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(globalErrorMiddleware);

  return app.init();
};

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

// Handle OPTIONS requests
server.options('*', cors());

// Listen on localhost:3001
if (process.env.DEV == 'nest') {
  server.listen(3001, () => {
    console.log('Server listening on http://localhost:3001');
  });
}

export const api = functions.https.onRequest(server);
