import { User } from "./user.model";
import { Order, OrderItem } from "./order.model";
import { Game, GameAsset, GameEdition, GameKey } from "./game.model";
import { Cart, CartItem } from "./cart.model";
import { FavoriteGame } from "./favorite.model";

// --- RELAÇÕES DE USUÁRIO ---
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(FavoriteGame, { foreignKey: "user_id" });
FavoriteGame.belongsTo(User, { foreignKey: "user_id" });

// --- RELAÇÕES DE GAME & EDITIONS ---
Game.hasOne(GameAsset, { foreignKey: "game_id", onDelete: "CASCADE" });
GameAsset.belongsTo(Game, { foreignKey: "game_id", onDelete: "CASCADE" });

Game.hasMany(GameEdition, { foreignKey: "game_id", onDelete: "CASCADE" });
GameEdition.belongsTo(Game, { foreignKey: "game_id" });

GameEdition.hasMany(GameKey, {
  foreignKey: "game_edition_id",
  onDelete: "CASCADE",
});
GameKey.belongsTo(GameEdition, { foreignKey: "game_edition_id" });

GameEdition.hasMany(FavoriteGame, { foreignKey: "game_edition_id" });
FavoriteGame.belongsTo(GameEdition, {
  foreignKey: "game_edition_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// --- RELAÇÕES DE ORDER & ITEMS ---
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Order.hasMany(GameKey, { foreignKey: "order_id" });
GameKey.belongsTo(Order, { foreignKey: "order_id" });

OrderItem.belongsTo(GameEdition, { foreignKey: "game_edition_id" });
OrderItem.belongsTo(GameKey, { foreignKey: "game_key_id" });

// --- RELAÇÕES DE CART ---
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

CartItem.belongsTo(GameEdition, { foreignKey: "game_edition_id" });

export * from "./user.model";
export * from "./game.model";
export * from "./favorite.model";
export * from "./cart.model";
export * from "./order.model";
