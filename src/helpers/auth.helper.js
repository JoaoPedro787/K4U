import { Conflict } from "@/exceptions/http.exception";

export const parseUniqueError = (err) => {
  if (err.name !== "SequelizeUniqueConstraintError") return null;

  const field = Object.keys(err.fields || {})[0];

  const messages = {
    email: "Email already in use.",
    username: "Username already in use.",
  };

  return new Conflict(messages[field] || "Duplicate value.");
};
