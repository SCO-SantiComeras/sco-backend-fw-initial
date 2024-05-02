import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppInterceptor } from './app.interceptor';
import { CoreModule } from 'sco-backend-fw';

@Module({
  imports: [
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
