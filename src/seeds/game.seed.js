import { Game, GameEdition, GameKey, GameAsset } from "@models";
import sequelize from "@configs/db";

const platforms = ["PC", "XBOX", "PLAYSTATION"];

const seed = async () => {
  const transaction = await sequelize.transaction();

  try {
    const gamesData = [
      {
        name: "Elden Ring",
        price: 249.9,
        released_at: "2022-02-25",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/8d88e0fd11364c789f6606a5b672f53d.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/130193108c9096700c242095f9c5d070.png",
          hero: "https://cdn2.steamgriddb.com/hero/0270a483e580e060012b591b61c944c6.jpg",
        },
      },
      {
        name: "Hollow Knight",
        price: 59.9,
        released_at: "2017-02-24",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/8f106678229b43d31704da8c950d8b4e.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/3449195b0981977759b95e34789e9f90.png",
          hero: "https://cdn2.steamgriddb.com/hero/5980072b260907d0f9a2e6f48f65759c.jpg",
        },
      },
      {
        name: "Cyberpunk 2077",
        price: 199.9,
        released_at: "2020-12-10",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/f97b6e9447475351745e95811796f600.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/5879d799f91a56ec94c156f082e51928.png",
          hero: "https://cdn2.steamgriddb.com/hero/2f9c3f87532386121980839e31d59666.jpg",
        },
      },
      {
        name: "Stray",
        price: 84.9,
        released_at: "2022-07-19",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/524317f2268f70e932ec13719a7978f1.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/08851416999b19e9177114670b3c6609.png",
          hero: "https://cdn2.steamgriddb.com/hero/05e05448374d754f9a0d249f3e498c1d.jpg",
        },
      },
      {
        name: "God of War Ragnarök",
        price: 299.0,
        released_at: "2022-11-09",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/655f464082264df751a7741369528d9c.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/663d2745a556ee0c4608c02c05ed8361.png",
          hero: "https://cdn2.steamgriddb.com/hero/89669528659d48259d6e42b6a9602513.jpg",
        },
      },
      {
        name: "Red Dead Redemption 2",
        price: 239.0,
        released_at: "2018-10-26",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/241d7d0a65389626359d424b94a1a361.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/921619472719d38c6426435c249495e8.png",
          hero: "https://cdn2.steamgriddb.com/hero/7504f253246a48232c45163f53835624.jpg",
        },
      },
      {
        name: "Sekiro: Shadows Die Twice",
        price: 274.5,
        released_at: "2019-03-22",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/43f338d1e3d09a0a03b5443e2e50529d.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/99602e707e4e09f5e347719602c3070b.png",
          hero: "https://cdn2.steamgriddb.com/hero/573676450090886618408f6154687258.jpg",
        },
      },
      {
        name: "Baldur's Gate 3",
        price: 199.99,
        released_at: "2023-08-03",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/2791696b97285141f3d6c13e51a660d5.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/5879d799f91a56ec94c156f082e51928.png", // Reuso do grid BG3
          hero: "https://cdn2.steamgriddb.com/hero/4b228f420101b059868f7004f128c70f.jpg",
        },
      },
      {
        name: "Alan Wake 2",
        price: 270.0,
        released_at: "2023-10-27",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/8d0a3d4f48866f7f25e971485669b30c.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/1d348a43f80c6520b0808a3d75323282.png",
          hero: "https://cdn2.steamgriddb.com/hero/493721387d8961726715f6067c2111d4.jpg",
        },
      },
      {
        name: "Sea of Stars",
        price: 109.99,
        released_at: "2023-08-28",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/f1e58f2947d510c42289f66847c1b505.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/c0702e882414702167d4469032483863.png",
          hero: "https://cdn2.steamgriddb.com/hero/9c1044439c29f60f64c632832502f694.jpg",
        },
      },
      {
        name: "Dark Souls III",
        price: 229.9,
        released_at: "2016-04-12",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/687399839958784d0891d467793d2562.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/d690623d3ad15e45138136c0a0c6a858.png",
          hero: "https://cdn2.steamgriddb.com/hero/09044e057f864115b0429a393f7c3272.jpg",
        },
      },
      {
        name: "Street Fighter 6",
        price: 249.0,
        released_at: "2023-06-02",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/6045952e4f014889c25f483c65961608.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/c4287d3a0166299d949437946977c088.png",
          hero: "https://cdn2.steamgriddb.com/hero/936444855476a603c6f2e2269a848b78.jpg",
        },
      },
      {
        name: "Persona 5 Royal",
        price: 249.0,
        released_at: "2022-10-21",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/0f2468352668500203f7360a04944883.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/92620a2730623512879555c91b40203a.png",
          hero: "https://cdn2.steamgriddb.com/hero/8227b689a74a87a206a378278f24419b.jpg",
        },
      },
      {
        name: "Celeste",
        price: 59.99,
        released_at: "2018-01-25",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/d99292a830b535d496e5a6a683ec8975.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/a697720275ef9c8119041280d944062a.png",
          hero: "https://cdn2.steamgriddb.com/hero/33f269550b07e59670d993e36e4f1642.jpg",
        },
      },
      {
        name: "Monster Hunter: World",
        price: 99.9,
        released_at: "2018-08-09",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/762c4f346087d341935c104e13e2008e.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/776077558ec4043b44b92b67f1850125.png",
          hero: "https://cdn2.steamgriddb.com/hero/025983711956e2101344265f0e91404e.jpg",
        },
      },
      {
        name: "Dragon's Dogma 2",
        price: 299.0,
        released_at: "2024-03-22",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/42566ec4852924976778685160867825.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/83c07624d7756f8f533a38f3216834b6.png",
          hero: "https://cdn2.steamgriddb.com/hero/1691316656.jpg",
        },
      },
      {
        name: "Hades",
        price: 73.99,
        released_at: "2020-09-17",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/a690e0c05973945a0b7782782e564d26.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/789a8731f416e9f134591a32943e6704.png",
          hero: "https://cdn2.steamgriddb.com/hero/36881c9842a2754687258451f251c50e.jpg",
        },
      },
      {
        name: "Star Wars Jedi: Survivor",
        price: 299.0,
        released_at: "2023-04-28",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/9029a1752b02047806a66166110f69f2.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/921509a25b82c68e14674384a5628588.png",
          hero: "https://cdn2.steamgriddb.com/hero/0c23864a75369680a653457a415494d4.jpg",
        },
      },
      {
        name: "Final Fantasy VII Remake Intergrade",
        price: 349.9,
        released_at: "2021-12-16",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/24f794b12166e5229410313f8c5b058c.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/ca355a2984534f3b7c93e433a013444a.png",
          hero: "https://cdn2.steamgriddb.com/hero/738f654b9845450849925e07a33e382d.jpg",
        },
      },
      {
        name: "Cuphead",
        price: 36.99,
        released_at: "2017-09-29",
        assets: {
          thumb:
            "https://cdn2.steamgriddb.com/thumb/e8b82a729e28989504f762624a66e60b.jpg",
          cover:
            "https://cdn2.steamgriddb.com/grid/832b3658a5e3e218206240212f462a7b.png",
          hero: "https://cdn2.steamgriddb.com/hero/6249e083c92f6946001091515273f695.jpg",
        },
      },
    ];

    for (const data of gamesData) {
      // Criação do Game com o novo campo released_at
      const game = await Game.create(
        {
          name: data.name,
          released_at: data.released_at,
        },
        { transaction },
      );

      // Assets
      await GameAsset.create(
        {
          game_id: game.id,
          thumbnail: data.assets.thumb,
          cover: data.assets.cover,
          carousel: data.assets.hero,
        },
        { transaction },
      );

      // Editions & Keys
      for (const platform of platforms) {
        const edition = await GameEdition.create(
          {
            game_id: game.id,
            platform,
            price: data.price,
          },
          { transaction },
        );

        // Gera entre 10 e 30 chaves por edição
        const keyAmount = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        const keys = Array.from({ length: keyAmount }).map(() => ({
          game_edition_id: edition.id,
        }));

        await GameKey.bulkCreate(keys, { transaction });
      }
    }

    await transaction.commit();
    console.log("✅ Seed completa: Jogos, Assets, Datas de Lançamento e Keys.");
  } catch (err) {
    if (transaction) await transaction.rollback();
    console.error("❌ Erro no seed:", err);
  } finally {
    await sequelize.close();
  }
};

seed();
