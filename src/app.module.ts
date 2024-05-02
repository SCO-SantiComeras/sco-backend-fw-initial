import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from 'sco-backend-fw';
import { AppService } from './app.service';
import { AppInterceptor } from './app.interceptor';
import { configurationApp } from './configuration/configuration-app';
import { configurationCore } from './configuration/configuration-core';

require("dotenv").config();

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        configurationApp,
        configurationCore,
      ],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
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
