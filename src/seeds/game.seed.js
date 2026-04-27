import { Game, GameEdition, GameKey, GameAsset } from "@models";
import sequelize from "@configs/db";

const platforms = ["PC", "XBOX", "PLAYSTATION"];

const seed = async () => {
  const transaction = await sequelize.transaction();

  try {
    const gamesData = [
      {
        name: "Resident Evil 4",
        appId: "2050650",
        price: 169.0,
        released_at: "2023-03-24",
      },
      {
        name: "Dead Space",
        appId: "1693980",
        price: 249.0,
        released_at: "2023-01-27",
      },
      {
        name: "Spider-Man Remastered",
        appId: "1817070",
        price: 249.9,
        released_at: "2022-08-12",
      },
      {
        name: "Dredge",
        appId: "1562430",
        price: 79.0,
        released_at: "2023-03-30",
      },
      {
        name: "Lies of P",
        appId: "1627720",
        price: 230.0,
        released_at: "2023-09-18",
      },
      {
        name: "Ghost of Tsushima DIRECTOR'S CUT",
        appId: "2215430",
        price: 249.0,
        released_at: "2024-05-16",
      },
      {
        name: "Balatro",
        appId: "2379780",
        price: 44.99,
        released_at: "2024-02-20",
      }, // Um pouco abaixo de 59, mas essencial
      {
        name: "Tekken 8",
        appId: "1778820",
        price: 269.0,
        released_at: "2024-01-26",
      },
      {
        name: "Forza Horizon 5",
        appId: "1551360",
        price: 249.0,
        released_at: "2021-11-09",
      },
      {
        name: "It Takes Two",
        appId: "1426210",
        price: 179.0,
        released_at: "2021-03-26",
      },
      {
        name: "Outer Wilds",
        appId: "753640",
        price: 59.99,
        released_at: "2019-05-30",
      },
      {
        name: "Nier: Automata",
        appId: "524220",
        price: 107.0,
        released_at: "2017-03-17",
      },
      {
        name: "Doom Eternal",
        appId: "782330",
        price: 149.0,
        released_at: "2020-03-20",
      },
      {
        name: "Sifu",
        appId: "2138710",
        price: 75.99,
        released_at: "2023-03-28",
      },
      {
        name: "Dave the Diver",
        appId: "1868140",
        price: 59.99,
        released_at: "2023-06-28",
      },
      {
        name: "Horizon Forbidden West",
        appId: "2420110",
        price: 249.0,
        released_at: "2024-03-21",
      },
      {
        name: "God of War (2018)",
        appId: "1593500",
        price: 199.0,
        released_at: "2022-01-14",
      },
      {
        name: "Risk of Rain 2",
        appId: "632360",
        price: 59.99,
        released_at: "2020-08-11",
      },
      {
        name: "Ratchet & Clank: Rift Apart",
        appId: "1895880",
        price: 249.0,
        released_at: "2023-07-26",
      },
      {
        name: "Black Myth: Wukong",
        appId: "2358720",
        price: 229.99,
        released_at: "2024-08-20",
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
