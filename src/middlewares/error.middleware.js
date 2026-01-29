import HttpErrorBase from "@exceptions/http.exceptions.js";

export default function errorHandler(err, _req, res, _next) {
  console.log(err);

  if (err instanceof HttpErrorBase) {
    res.status(err.statusCode).json({ detail: err.message });
  }

  return res.status(500).send();
}
