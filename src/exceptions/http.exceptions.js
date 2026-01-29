export default class HttpErrorBase extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFound extends HttpErrorBase {
  constructor(message) {
    super(message, 404);
  }
}

export class Forbidden extends HttpErrorBase {
  constructor(message) {
    super(message, 403);
  }
}

export class Unauthorized extends HttpErrorBase {
  constructor(message) {
    super(message, 401);
  }
}

export class BadRequest extends HttpErrorBase {
  constructor(message) {
    super(message, 400);
  }
}
