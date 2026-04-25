import { findKeysByUser, findKeysByOrder } from "@repositories/keys.repository";

import { mapKeyListToRep } from "@mappers/keys.mapper";

import { NotFound } from "@/exceptions/http.exception";

export const getKeysService = async (user) => {
  const keys = await findKeysByUser(user);

  const rep = mapKeyListToRep(keys);

  return rep;
};

export const getKeysByOrderService = async (order, user) => {
  const keys = await findKeysByOrder(order, user);

  if (keys.length < 1) throw new NotFound("Order's key not found.");

  const rep = mapKeyListToRep(keys);

  return rep;
};
