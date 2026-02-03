import * as Yup from "yup";

export const FavoriteGameCreate = Yup.object().shape({
  game_edition_id: Yup.number().required(),
});

export const FavoriteGameDelete = Yup.object().shape({
  id: Yup.number().required(),
});
