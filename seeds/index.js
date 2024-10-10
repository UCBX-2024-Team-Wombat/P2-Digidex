const sequelize = require("../config/connection");
const {
  User,
  Collection,
  CollectionToUser,
  Card,
  CardToCollection,
} = require("../models/index");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const janeDoe = await User.create({
    name: "Jane Doe",
    email: "jane@test.com",
    password: "abc123456",
  });

  // Wombat Info
  const wombatCollection = await Collection.create({
    title: "Wombat Facts",
    description: "Facts about Wombats",
  });

  const janeToWombatCollection = await CollectionToUser.create({
    collectionId: wombatCollection.id,
    userId: janeDoe.id,
  });

  const wombatFactCards = await Card.bulkCreate(
    [
      {
        title: "Poop",
        description: `
Wombat poop is *naturally shaped like cubes*. 

<a href="https://www.bbc.com/news/world-australia-46258616" target="_blank">
<img src="https://static6.businessinsider.com/image/5bf336ee110d4c09852cc0cc-1190-625/wombats-have-distinctly-cube-shaped-poop-and-scientists-finally-know-how-they-do-it.jpg" alt="wombat cube poop" width="700px"/>
</a>
        `,
      },
      {
        title: "Bio-fluorescence",
        description: `
Wombats freaking **glow in the dark** under ultraviolet light! 

<!-- You can write HTML directly for more complicated display functionality -->
<a href="https://nypost.com/2020/11/27/australian-scientists-discover-wombats-glow-under-uv-light/" target="_blank">
<img src="https://nypost.com/wp-content/uploads/sites/2/2020/11/wombats-uv-light.jpg?quality=75&strip=all" alt="wombat" width="400px" />
</a>
`,
      },
      {
        title: "Boney Butts",
        description: `
Wombats have *extremely dense butts* made of boney plates and thick cartilage. They use them to plug up their burrows when attacked. 


<a href="https://www.theguardian.com/science/2020/nov/04/wombats-deadly-bums-how-they-use-their-skull-crushing-rumps-to-fight-play-and-flirt" target="_blank">
<img src="https://s-media-cache-ak0.pinimg.com/600x315/f3/5e/48/f35e4885760fbaa4496123fde58e22a6.jpg" alt="Wombat being held in human arms"/>
</a>
`,
      },
    ],
    { individualHooks: true }
  );

  const wombatCollectionToCardData = [];

  for (const card of wombatFactCards) {
    wombatCollectionToCardData.push({
      collectionId: wombatCollection.id,
      cardId: card.id,
    });
  }

  const wombatCollectionToWombatFactCards = await CardToCollection.bulkCreate(
    wombatCollectionToCardData
  );

  // Coding Info

  const codingCollection = await Collection.create({
    title: "Useful Coding Stuff",
    description: "Links to stuff I keep needing but can't seem to remember 😅",
  });

  const janeToCodingCollection = await CollectionToUser.create({
    collectionId: codingCollection.id,
    userId: janeDoe.id,
  });

  const codingCards = await Card.bulkCreate(
    [
      {
        title: "Getting Dataset Info In JS",
        description: 
        `
To get the dataset property of an element, use \`.dataset\`, then the property name. Convert the name from the kebab case in HTML (e.g. \`dataset-my-dataset-name\`) to snake case (e.g. \`myDatasetName\`)

###### Example:
\`\`\`
const datasetValue = document.getElementById('my-element-id').dataset.myDatasetName
\`\`\`

###### Refs:
* [Stack Overflow Link](https://stackoverflow.com/a/33760558/8032508)
* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
        `,
      },
      {
        title: "How the hell does Markdown work again?",
        description: 
        `
TL;DR - Just watch [this video](https://www.youtube.com/watch?v=_PPWWRV6gbA&t=60s)

* *Italics*: One asterisk (\*) on either side of a word or phrase, *like this*
* **Bold**: Two asterisks (\*) on either side of a word or phrase, ** like this**
* Use two tilde (\~) on either side of a word or phrase to ~~use strikethrough~~
* For hyperlinks, use \[link display name\]\(https://your.hyperlink.here\). E.g. [google](https://www.google.com)
  * **Note**: be sure to add the "https" in your hyperlink section or the link might not work
`,
      },
    ],
    { individualHooks: true }
  );

  const codingCollectionToCardData = [];

  for (const card of codingCards) {
    codingCollectionToCardData.push({
      collectionId: codingCollection.id,
      cardId: card.id,
    });
  }

  await CardToCollection.bulkCreate(codingCollectionToCardData);

  process.exit(0);
};

seedDatabase();
