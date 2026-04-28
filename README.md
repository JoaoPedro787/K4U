# Keys For You (K4U)

Back-end API for a digital game store featuring catalog management by edition/platform, JWT cookie authentication, shopping cart, favorites, orders, key reservation, and Stripe checkout integration.

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="42" height="42" alt="JavaScript" title="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="42" height="42" alt="Node.js" title="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="42" height="42" alt="Express" title="Express" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="42" height="42" alt="PostgreSQL" title="PostgreSQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" width="42" height="42" alt="Sequelize" title="Sequelize" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" width="42" height="42" alt="Redis" title="Redis" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" width="42" height="42" alt="Babel" title="Babel" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodemon/nodemon-original.svg" width="42" height="42" alt="Nodemon" title="Nodemon" />
</div>

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=fff)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=fff)
![Pino](https://img.shields.io/badge/Pino-687634?style=for-the-badge&logo=pino&logoColor=fff)
![Yup](https://img.shields.io/badge/Yup-2563EB?style=for-the-badge)
![Lovable](https://img.shields.io/badge/Lovable-FF5A5F?style=for-the-badge)

## About the Project

K4U is an API for selling digital game keys. Users can create an account, authenticate, browse game editions, favorite products, manage a cart, generate orders, pay via Stripe Checkout, and consult purchased keys once payment is confirmed via webhook.

This repository contains the API. The `FRONTEND_BASE_URL` variable in `.env.example` points to a Lovable application used as the front-end/integration base.

## Key Features

- User registration, login, and logout with JWT in signed cookies.
- Token revocation via Redis.
- Public catalog of game editions by platform.
- User-specific shopping cart and favorites list.
- Order creation from the cart with key reservation during checkout.
- Integration with Stripe Checkout and Webhooks for order finalization.
- Background job to cancel expired orders and release reserved keys.
- Structured HTTP logging with Pino.

---

## Live Demo & Testing

You can test the project live using the following links:

- **Frontend (UI):** [https://k4u-7788.lovable.app]
- **Backend (API):** [https://k4u.onrender.com]

> **Note:** To test the checkout flow, please use Stripe's test card credentials.

---

## Tech Stack

- **Runtime:** Node.js
- **HTTP Framework:** Express 5
- **Database:** PostgreSQL & Sequelize (ORM)
- **Cache/Temporary State:** Redis
- **Payments:** Stripe Checkout & Stripe Webhooks
- **Authentication:** JWT, cookie-parser, and Argon2
- **Validation:** Yup
- **Logging:** Pino, pino-http, and pino-pretty
- **Development:** Babel, Nodemon, and Lovable

---

## Project Structure

```text
src/
  app.js                  # Express config, middlewares, and base routes
  server.js               # API Bootstrap, DB, Redis, and jobs
  settings.js             # Environment variable management
  configs/                # Service configurations (DB, Redis, Stripe, Logger)
  controller/             # HTTP Controllers
  routes/                 # Route definitions
  services/               # Business logic and orchestration
  repositories/           # Data access via Sequelize
  models/                 # Sequelize models and associations
  schemas/                # Yup validation schemas
  middlewares/            # Auth, error handling, and Stripe webhook middleware
  mappers/                # Data formatting
  utils/                  # Shared utilities
```

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

Create a `.env` file from the example and fill in the required credentials (DB, Redis, Stripe, JWT secrets).

### 3. Run PostgreSQL and Redis

Ensure PostgreSQL and Redis are running locally or through external services as the project authenticates on startup.

### 4. Run the API

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## Main Routes

| Method | Route            | Description                                      |
| ------ | ---------------- | ------------------------------------------------ |
| POST   | /auth/sign-up    | Creates a user and an initial cart.              |
| POST   | /auth/sign-in    | Authenticates and sets the access_token cookie.  |
| GET    | /games/editions  | Lists game editions with pagination/filters.     |
| POST   | /users/orders    | Creates an order and generates a Stripe session. |
| POST   | /payment/webhook | Receives Stripe events to complete orders.       |

---

## Checkout Workflow

1. User adds items to cart.
2. `POST /users/orders`: API creates a PENDING order, reserves keys, and generates a Stripe session.
3. Stripe Webhook: Upon successful payment, the API marks keys as SOLD and the order as COMPLETED.
4. Fulfillment: User retrieves purchased keys via `/users/orders/keys`.

---

## Infrastructure

- **API Hosting:** Render
- **Database:** PostgreSQL (Supabase)
- **Cache:** Redis (Redis Cloud)
- **Frontend:** Lovable

This setup leverages managed cloud services to reduce operational overhead while ensuring scalability and availability. The API is deployed on Render with environment-based configuration, the PostgreSQL database is provisioned via Supabase, Redis Cloud is used for caching and token/session management, and the frontend is integrated through Lovable.

---

## Key Learnings & Competencies

This project served as a comprehensive application of backend engineering and infrastructure principles:

- **MVC & Design Patterns:** Applied a strict separation of concerns using the MVC (Model-View-Controller) pattern combined with Repositories and Services to maintain a clean, testable codebase.

- **External Service Orchestration:** Integrated the Stripe ecosystem, handling secure payment flows and implementing Webhooks to manage asynchronous order fulfillment.

- **Infrastructure & Connectivity:** Faced and resolved real-world deployment challenges, such as managing environment variables across different hosting providers.

- **Concurrency & State Management:** Leveraged Redis for efficient session management and payment URL caching, alongside Sequelize transactions to ensure data integrity during inventory reservations.
