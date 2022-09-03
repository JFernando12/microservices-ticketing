import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import Jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@jfticketing/common';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = Router();

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(existUser.password, password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    //Generate JWT
    const userJwt = Jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existUser);
  }
);

export { router as signinRouter };
