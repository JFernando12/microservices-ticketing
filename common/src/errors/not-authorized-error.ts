import { CustomError } from "./custom-error";

export class NotAuthorizedErrror extends CustomError {
    statusCode = 401

    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedErrror.prototype);
    }

    serializeErrors() {
        return[{ message: 'Not authorized' }];
    }
}