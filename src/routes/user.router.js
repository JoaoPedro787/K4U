import { Router } from "express";
import favoriteRouter from "./favorite.router";

const router = Router();

router.use("/favorite", favoriteRouter);

export default router;
