import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from 'sco-backend-fw';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';
import { configurationApp } from './configuration/configuration-app';
import { configurationCore } from './configuration/configuration-core';
import { configurationWebSockets } from './configuration/configuration-webSockets';
import { WebsocketsModule } from './core/websockets/websockets.module';
import { configurationCors } from './configuration/configuration-cors';
import { SharedModule } from './core/shared/shared.module';
import { configurationMongo } from './configuration/configuration-mongo';
import { MongoDbModule } from './core/mongo-db/mongo-db.module';

require("dotenv").config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        configurationApp,
        configurationCore,
        configurationWebSockets,
        configurationCors,
        configurationMongo,
      ],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    WebsocketsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          enabled: configService.get('ws.enabled'),
          port: configService.get('ws.port'),
          origin: configService.get('ws.origin'),
        };
      },
      inject: [ConfigService],
    }),
    MongoDbModule.register(),
    SharedModule,
    CoreModule.registerAsync({
      imports: [],
      useFactory: () => {
        return {
          verbose: true,
          path: './src',
          folder: 'controller',
          extension: 'ts',
          response: false,
          validationPipe: true,
          validationPassport: false,
        };
      },
      inject: [],
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
  ],
})
export class AppModule {}
