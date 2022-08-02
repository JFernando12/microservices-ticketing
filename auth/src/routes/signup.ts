import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = Router();

router.post('/signup', 
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        console.log('Creating users...');
        throw new DatabaseConnectionError();

        res.send({});9
})

export { router as signupRouter };