import { to } from "@/utils";

import {
  createFullOrderService,
  getUserOrderService,
  getOrderService,
} from "@/services/order.service";

import { getOrderPaymentService } from "@/services/payment.service";

export const postNewOrder = async (req, res, next) => {
  const user = req.user;
  const { error, data } = await to(createFullOrderService(user));

  if (error) return next(error);

  req.logMessage = "order and payment created";
  req.logExtras = { order_id: data.orderId, session: data.sessionId };

  res.status(201).json({ payment_url: data.url });
};

export const getUserOrders = async (req, res) => {
  const user = req.user;
  const orders = await getUserOrderService(user);

  res.json(orders);
};

export const getOrder = async (req, res, next) => {
  const user = req.user;
  const orderId = req.params.id;

  const { data, error } = await to(getOrderService(user, orderId));

  if (error) return next(error);

  req.logMessage = "getting user's order";
  req.logExtras = { order_id: orderId };

  res.json(data);
};

export const getOrderPaymentUrl = async (req, res, next) => {
  const user = req.user;
  const orderId = req.params.id;

  const { data, error } = await to(getOrderPaymentService(user, orderId));

  if (error) return next(error);

  req.logMessage = "getting order's payment";
  req.logExtras = { order_id: orderId };

  res.json({ payment_url: data });
};
