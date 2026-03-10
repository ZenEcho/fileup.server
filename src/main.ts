import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Fix BigInt serialization issue
  Object.defineProperty(BigInt.prototype, 'toJSON', {
    value: function () {
      return Number(this);
    },
    configurable: true,
  });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
