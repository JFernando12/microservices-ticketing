import {
  BadRequestError,
  NotAuthorizedErrror,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@jfticketing/common';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/order';

const router = Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedErrror();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Order is already cancelled');
    }

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
