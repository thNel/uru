import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {envData} from '@/constants';
import {VersioningType} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      cors: {
        credentials: true,
        origin: envData.isDev ? ['http://127.0.0.1:3000', 'http://localhost:3000'] : envData.appHost,
      }
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser(envData.cookiesSecret));
  const port = 6969;
  await app.listen(port);
}

bootstrap().catch((e) => console.error(e));
