import * as Yup from "yup";

export const ParamId = Yup.object().shape({
  id: Yup.string().uuid().required(),
});
