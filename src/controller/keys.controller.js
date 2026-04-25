import { getKeysByOrderService, getKeysService } from "@services/keys.service";

import { to } from "@/utils";

export const getKeys = async (req, res) => {
  const user = req.user;

  const keys = await getKeysService(user);

  req.logMessage = "user getting keys from all orders";
  req.logExtras = { has_keys: keys.length >= 1, total_keys: keys.length };

  res.status(200).json(keys);
};

export const getKeyByQuery = async (req, res, next) => {
  const user = req.user;
  const order = req.params.id;

  const { error, data } = await to(getKeysByOrderService(order, user));

  if (error) return next(error);

  req.logMessage = "user getting keys from order";
  req.logExtras = { order_id: order, total_keys: data.length };

  res.status(200).json(data);
};
