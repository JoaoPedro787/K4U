import Stripe from "stripe";
import Settings from "@/settings";

export const stripe = new Stripe(Settings.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});
