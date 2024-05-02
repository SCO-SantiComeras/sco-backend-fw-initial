import { Injectable } from "@nestjs/common";
import { ICore, IFileFunction, TYPES } from "sco-backend-fw";

@Injectable()
export class AppService implements ICore {

    /* Add Own Dependencies */
    constructor(
        // Example: private readonly websocketsService: WebsocketsService,
    ) {}

    /*  Function Files Constants*/
    getFuntionFilesConstants(): IFileFunction[] {
        return [
            /* Global */
            {
                file: 'hello',
                path: 'global',
                resultType: 'string',
            },
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
    getTypesConstants(): any {
        return {
            ...TYPES,
        }
    }
}
