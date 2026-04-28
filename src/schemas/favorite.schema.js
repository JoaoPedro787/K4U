import * as Yup from "yup";

export const FavoriteGameCreate = Yup.object().shape({
  game_edition_id: Yup.string().trim().uuid().required(),
});
