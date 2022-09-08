import { requireAuth } from '@jfticketing/common';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as createTicketRouter };
