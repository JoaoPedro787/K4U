import { DataTypes } from "sequelize";

import sequelize from "@configs/db";
import Settings from "@/settings";

export const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM("PENDING", "CANCELED", "COMPLETED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
  expire_date: {
    type: DataTypes.DATE,
    defaultValue: () => {
      const d = new Date();
      d.setMinutes(d.getMinutes() + Settings.STRIPE_EXPIRE_MINUTE);
      return d;
    },
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (!this.OrderItems) return null;
      const total = this.OrderItems.reduce(
        (sum, el) => sum + el.unity_price * el.quantity,
        0,
      ).toFixed(2);

      return total;
    },
  },
});

export const OrderItem = sequelize.define("OrderItem", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.INTEGER, allowNull: false },
  game_edition_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_key_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unity_price: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.VIRTUAL,
    get() {
      return (this.unity_price * this.quantity).toFixed(2);
    },
  },
});
