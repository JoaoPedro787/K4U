export default class Settings {
  // CORE
  static PORT = process.env.PORT;

  // DB
  static DB_DATABASE = process.env.DB_DATABASE;
  static DB_HOST = process.env.DB_HOST;
  static DB_PORT = process.env.DB_PORT;
  static DB_USER = process.env.DB_USER;
  static DB_PASSWORD = process.env.DB_PASSWORD;

  // COOKIE
  static COOKIE_SECRET = process.env.COOKIE_SECRET;

  // JWT
  static JWT_SECRET = process.env.JWT_SECRET;
  static JWT_ALGORITHM = process.env.JWT_ALGORITHM;
  static JWT_EXPIRE_MINUTE = process.env.JWT_EXPIRE_MINUTE;

  // REDIS
  static REDIS_HOST = process.env.REDIS_HOST;

  // STRIPLE
  static STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
  static STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  static STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  static STRIPE_EXPIRE_MINUTE = 30;

  // Frontend
  static FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
}
