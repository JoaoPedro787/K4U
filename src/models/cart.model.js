import sequelize from "@/configs/db";
import { DataTypes } from "sequelize";

export const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (!this.CartItems) return null;
      const total = this.CartItems.reduce(
        (sum, el) => sum + el.GameEdition.price * el.quantity,
        0,
      ).toFixed(2);

      return total;
    },
  },
});

export const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    public_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    game_edition_id: {
      type: DataTypes.INTEGER,
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
        if (!this.GameEdition) return null;
        return (this.GameEdition.price * this.quantity).toFixed(2);
      },
    },
  },
  { indexes: [{ unique: true, fields: ["public_id"] }] },
);
