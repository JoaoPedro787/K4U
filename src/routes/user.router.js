import { Router } from "express";

// Routes
import favoriteRouter from "./favorite.router";
import cartRouter from "./cart.router";

const router = Router();

router.use("/favorite", favoriteRouter);

router.use(cartRouter);

export default router;
