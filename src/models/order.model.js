import sequelize from "@configs/db";
import { DataTypes } from "sequelize";
import { User, GameEdition, GameKey } from "@models";

export const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM("PENDING", "CANCELLED", "COMPLETED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
  expire_date: {
    type: DataTypes.DATE,
    defaultValue: () => {
      const d = new Date();
      d.setMinutes(d.getMinutes() + 30);
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

// User <-> Order 1:N
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// Order <-> OrderItems 1:N
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// OrderItem -> GameEdition 1:1
OrderItem.belongsTo(GameEdition, { foreignKey: "game_edition_id" });

// OrderItem -> GameKey 1:1 (opcional)
OrderItem.belongsTo(GameKey, { foreignKey: "game_key_id" });
