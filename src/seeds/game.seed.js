import { Game, GameEdition, GameKey, GameAsset } from "@models";
import sequelize from "@configs/db";

const platforms = ["PC", "XBOX", "PLAYSTATION"];

const seed = async () => {
  const transaction = await sequelize.transaction();

  try {
    const gamesData = [
      {
        name: "Elden Ring",
        appId: "1245620",
        price: 249.9,
        released_at: "2022-02-25",
      },
      {
        name: "Hollow Knight",
        appId: "367520",
        price: 59.9,
        released_at: "2017-02-24",
      },
      {
        name: "Cyberpunk 2077",
        appId: "1091500",
        price: 199.9,
        released_at: "2020-12-10",
      },
      {
        name: "Stray",
        appId: "1332010",
        price: 84.9,
        released_at: "2022-07-19",
      },
      {
        name: "God of War Ragnarök",
        appId: "1196590",
        price: 299.0,
        released_at: "2022-11-09",
      },
      {
        name: "Red Dead Redemption 2",
        appId: "1174180",
        price: 239.0,
        released_at: "2018-10-26",
      },
      {
        name: "Sekiro: Shadows Die Twice",
        appId: "814380",
        price: 274.5,
        released_at: "2019-03-22",
      },
      {
        name: "Baldur's Gate 3",
        appId: "1086940",
        price: 199.99,
        released_at: "2023-08-03",
      },
      {
        name: "Alan Wake 2",
        appId: "1332010",
        price: 270.0,
        released_at: "2023-10-27",
      },
      {
        name: "Sea of Stars",
        appId: "1244090",
        price: 109.99,
        released_at: "2023-08-28",
      },
      {
        name: "Dark Souls III",
        appId: "374320",
        price: 229.9,
        released_at: "2016-04-12",
      },
      {
        name: "Street Fighter 6",
        appId: "1364780",
        price: 249.0,
        released_at: "2023-06-02",
      },
      {
        name: "Persona 5 Royal",
        appId: "1687950",
        price: 249.0,
        released_at: "2022-10-21",
      },
      {
        name: "Celeste",
        appId: "504230",
        price: 59.99,
        released_at: "2018-01-25",
      },
      {
        name: "Monster Hunter: World",
        appId: "582010",
        price: 99.9,
        released_at: "2018-08-09",
      },
      {
        name: "Dragon's Dogma 2",
        appId: "2054970",
        price: 299.0,
        released_at: "2024-03-22",
      },
      {
        name: "Hades",
        appId: "1145360",
        price: 73.99,
        released_at: "2020-09-17",
      },
      {
        name: "Star Wars Jedi: Survivor",
        appId: "1774580",
        price: 299.0,
        released_at: "2023-04-28",
      },
      {
        name: "Final Fantasy VII Remake Intergrade",
        appId: "1462040",
        price: 349.9,
        released_at: "2021-12-16",
      },
      {
        name: "Cuphead",
        appId: "268910",
        price: 36.99,
        released_at: "2017-09-29",
      },
    ];

    for (const data of gamesData) {
      // 1. Criar o Game
      const game = await Game.create(
        {
          name: data.name,
          released_at: data.released_at,
        },
        { transaction },
      );

      // 2. Criar os Assets (Usando o padrão Steam CDN verificado)
      await GameAsset.create(
        {
          game_id: game.id,
          cover: `https://shared.steamstatic.com/store_item_assets/steam/apps/${data.appId}/library_600x900_2x.jpg`,
          carousel: `https://shared.steamstatic.com/store_item_assets/steam/apps/${data.appId}/library_hero_2x.jpg`,
        },
        { transaction },
      );

      // 3. Criar Editions & Keys
      for (const platform of platforms) {
        const edition = await GameEdition.create(
          {
            game_id: game.id,
            platform,
            price: data.price,
          },
          { transaction },
        );

        // Gera quantidade aleatória entre 10 e 30
        const keyAmount = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

        const keys = Array.from({ length: keyAmount }).map((_, i) => ({
          game_edition_id: edition.id,
          key_code: `KEY-${data.appId}-${platform.charAt(0)}-${i + 1}`, // Opcional: apenas para visualização
        }));

        await GameKey.bulkCreate(keys, { transaction });
      }
    }

    await transaction.commit();
    console.log("✅ Seed finalizada com 20 jogos e assets oficiais da Steam.");
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.error("❌ Erro ao executar seed:", err);
  } finally {
    await sequelize.close();
  }
};

seed();
