import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from 'sco-backend-fw';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, 
    { 
      logger: new LoggerService(),
    }
  );
  await app.listen(3000);
  console.log(`[App] App started in 'http://localhost:3000'`);
}
bootstrap();
