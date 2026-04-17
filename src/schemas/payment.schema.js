import * as Yup from "yup";

export const CreateCheckoutSession = Yup.object({
  order_id: Yup.number().required(),
});
