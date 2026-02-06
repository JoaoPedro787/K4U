import * as Yup from "yup";

export const CartItemCreate = Yup.object().shape({
  game_edition_id: Yup.number().integer().positive().required(),
  quantity: Yup.number().integer().positive().min(1).default(1),
});

export const CartItemDelete = Yup.object().shape({
  id: Yup.number().integer().positive().required(),
});

export const CartItemUpdate = Yup.object().shape({
  id: Yup.number().integer().positive().required(),
  quantity: Yup.number().integer().positive().min(1).default(1),
});
