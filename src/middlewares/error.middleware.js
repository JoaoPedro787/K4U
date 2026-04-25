import HttpErrorBase from "@exceptions/http.exception.js";

export default function errorHandler(err, _req, res, _next) {
  res.err = err;

  if (err instanceof HttpErrorBase) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).send();
}
