import { to } from "@/utils";

import {
  createFullOrderService,
  getUserOrderService,
  getOrderService,
} from "@/services/order.service";

export const postNewOrder = async (req, res, next) => {
  const user = req.user;
  const { error } = await to(createFullOrderService(user));

  if (error) return next(error);

  res
    .status(201)
    .json({ detail: "Order created. Please proceed with the payment." });
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

  res.json(data);
};
