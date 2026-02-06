import sequelize from "@/configs/db";
import { DataTypes } from "sequelize";
import { User, GameEdition } from "@models";

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
      let total = 0;
      this.CartItems.map((el) => (total += Number(el.subtotal)));

      return total.toFixed(2);
    },
  },
});

export const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  },
  subtotal: {
    type: DataTypes.VIRTUAL,
    get() {
      if (!this.GameEdition) return null;
      return (this.GameEdition.price * this.quantity).toFixed(2);
    },
  },
});

// User -> Cart | Cart -> User
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

// Cart -> CartItem | CartItem -> Cart
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

// CartItem -> Cart
CartItem.belongsTo(GameEdition, {
  foreignKey: "game_edition_id",
});
