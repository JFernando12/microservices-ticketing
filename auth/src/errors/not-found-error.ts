import { CustomError } from "./custom-error"

export class NotFoundError extends CustomError {

    statusCode = 404;

    constructor() {
        super('No se encontro el endpoint');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not Found' }]
    }

}