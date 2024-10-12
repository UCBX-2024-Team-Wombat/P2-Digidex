const router = require('express').Router();
const { CardToCollection } = require('../../models/index');

router.post('/new', async (req, res) => {
  try {
    const newJunction = await CardToCollection.create(req.body)

    if(newJunction.id){
      res.status(201).send();
    }
    else{
      res.status(400).send();
    }

  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
})

module.exports = router;