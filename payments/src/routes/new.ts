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
import { Payment } from '../models/payment';
import { stripe } from '../stripe';

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

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId: order.id,
      stripeId: charge.id,
    });
    await payment.save();

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
