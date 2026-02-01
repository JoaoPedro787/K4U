import { NotFound } from "./http.exception";

export class GameNotFound extends NotFound {
  constructor() {
    super("Game not found. Please try again.");
  }
}
