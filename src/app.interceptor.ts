import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from './app.service';
import { HEADERS } from 'sco-backend-fw';
import { CoreService } from './core/core.service';

@Injectable()
export class AppInterceptor implements NestInterceptor {

  /* Add App dependencies inyection to context */
  constructor(
    private readonly coreService: CoreService,
    private readonly appService: AppService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /* Set Function Files Constants Header */
    context.switchToHttp().getRequest().headers[HEADERS.ROUTES] = this.coreService.createControllerRoutes();

    /* Set Providers Header */
    context.switchToHttp().getRequest().headers[HEADERS.PROVIDERS] = this.appService;

    /* Set Validation Passport Callback */
    context.switchToHttp().getRequest().headers[HEADERS.VALIDATION_PASSPORT] = this.coreService.validationPassportCallback.bind(this.coreService);

    /* Set Custom Types (Optional) */
    context.switchToHttp().getRequest().headers[HEADERS.TYPES] = this.coreService.setCustomTypes();
    
    return next.handle().pipe(
      tap(() => {
        /* After Interceptor Code Here... */
      }),
    );
  }
}