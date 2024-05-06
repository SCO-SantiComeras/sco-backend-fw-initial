import { Injectable } from "@nestjs/common";
import { HttpErrorsService } from "./core/shared/http-errors/http-errors.service";

@Injectable()
export class AppService {

    /* Add Own Dependencies */
    constructor(
        // Example: private readonly yourService: YourService,
        private readonly httpErrorsService: HttpErrorsService,
    ) {}
}
