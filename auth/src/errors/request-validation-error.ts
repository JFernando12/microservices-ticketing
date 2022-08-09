import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {

    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Error al validar los datos');
        
        //Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        const errors = this.errors.map(error => {
            return { message: error.msg, field: error.param};
        })
        return errors;
    }
}