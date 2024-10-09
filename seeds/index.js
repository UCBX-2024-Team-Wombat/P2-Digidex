const sequelize = require("../config/connection");
const {
  User,
  Collection,
  CollectionToUser,
  Card,
  CardToCollection,
} = require("../models/index");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const janeDoe = await User.create({
    name: "Jane Doe",
    email: "jane@test.com",
    password: "abc123456",
  });

  const wombatCollection = await Collection.create({
    title: "Wombat Facts",
    description: "Facts about Wombats",
  });

  const janeToWombatCollection = await CollectionToUser.create({
    collectionId: wombatCollection.id,
    userId: janeDoe.id,
  });

  const wombatFactCards = await Card.bulkCreate([
    {
      title: "Poop",
      description:
        "Wombat poop is naturally shaped like cubes. Link: https://factanimal.com/wombat/",
    },
    {
      title: "Bio-fluorescence",
      description:
        "Wombats glow slightly under ultraviolet light. Link: https://factanimal.com/wombat/",
    },
    {
      title: "Boney Butts",
      description:
        "Wombats have extremely dense butts made of boney plates and thick cartilage. They use them to plug up their burrows when attacked. Link: https://www.theguardian.com/science/2020/nov/04/wombats-deadly-bums-how-they-use-their-skull-crushing-rumps-to-fight-play-and-flirt",
    },
  ]);

  const wombatCollectionToCardData = [];
  
  for(const card of wombatFactCards){
    wombatCollectionToCardData.push({
      collectionId: wombatCollection.id,
      cardId: card.id
    });
  }

  const wombatCollectionToWombatFactCards = await CardToCollection.bulkCreate(wombatCollectionToCardData);

  // seedCollections();
  // seedCards()

  process.exit(0);
};

seedDatabase();
