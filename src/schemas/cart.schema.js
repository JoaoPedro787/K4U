import * as Yup from "yup";

export const CartItemCreate = Yup.object().shape({
  game_edition_id: Yup.string().uuid().required(),
  quantity: Yup.number().integer().positive().min(1).default(1),
});

export const CartItemUpdate = Yup.object().shape({
  quantity: Yup.number().integer().positive().min(1).default(1),
});
