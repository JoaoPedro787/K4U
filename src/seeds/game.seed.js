import { Game, GameEdition, GameKey } from "@models/game.model";
import sequelize from "@database/db";

const platforms = ["PC", "XBOX", "PLAYSTATION"];

const seed = async () => {
  const transaction = await sequelize.transaction();

  try {
    // ========= GAMES =========
    const games = await Game.bulkCreate(
      [{ name: "GTA VI" }, { name: "Cyberpunk 2077" }],
      { transaction },
    );

    for (const game of games) {
      // ========= EDITIONS (1 por plataforma) =========
      for (const platform of platforms) {
        const edition = await GameEdition.create(
          {
            game_id: game.id,
            platform,
            price: 199.9,
          },
          { transaction },
        );

        // ========= KEYS (5 por edição) =========
        const keys = Array.from({ length: 5 }).map(() => ({
          game_edition_id: edition.id,
        }));

        await GameKey.bulkCreate(keys, { transaction });
      }
    }

    await transaction.commit();
    console.log("✅ Seed criada respeitando plataformas");
  } catch (err) {
    await transaction.rollback();
    console.error("❌ Erro no seed:", err);
  } finally {
    await sequelize.close();
  }
};

seed();

// ChatGPT seed
