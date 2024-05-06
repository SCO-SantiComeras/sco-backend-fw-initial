import { Injectable } from "@nestjs/common";
import { FileFunctionsService, ICore, IFileFunction, TYPES } from "sco-backend-fw";
import { GLOBAL_ROUTES } from "./controller-routes/global.routes";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        private readonly fileFunctionsService: FileFunctionsService,
    ) {
        this.fileFunctionsService.setFileFunctions(this.createControllerRoutes());
    }

    /*  Function Files Constants*/
    createControllerRoutes(): IFileFunction[] {
        return [
            /* Global */
            ...GLOBAL_ROUTES,
        ];
    }

    /* Validation Passport */ 
    async validationPassportCallback(authorization: string): Promise<boolean> {
        if (!authorization) {
            return false;
        }

        return true;
    }

    /* Types */
    setCustomResultTypes(): any {
        return {
            ...TYPES, // Default Types, you are not required to set default types
        }
    }
}
