import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from 'sco-backend-fw';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';
import { configurationApp } from './configuration/configuration-app';
import { configurationCore } from './configuration/configuration-core';
import { configurationWebSockets } from './configuration/configuration-webSockets';
import { WebsocketsModule } from './modules/websockets/websockets.module';
import { configurationCors } from './configuration/configuration-cors';

require("dotenv").config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        configurationApp,
        configurationCore,
        configurationWebSockets,
        configurationCors,
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
