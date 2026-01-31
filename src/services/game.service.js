import { GameEdition } from "@models/game.model";

export const getAllGamesEdtion = async () => await GameEdition.findAll();
