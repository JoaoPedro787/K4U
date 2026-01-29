import HttpErrorBase from "@exceptions/http.exceptions.js";

export default function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpErrorBase) {
    return res.status(err.statusCode).json({ detail: err.message });
  }

  return res.status(500);
}
