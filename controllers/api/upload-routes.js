const router = require('express').Router();

router.post('/image', async (req, res) => {

  console.log(req.body)
  try {
    if(!req.body){
      res.send({
        status: false,
        message: 'No file uploaded'
      })
    }
    else {

      let avatar = req.body;

      avatar.mv('./uploads/' + avatar.name);

      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      })

    }

  }
  catch (err){
    console.log(err);
    res.status(500).send(err);
  }
})


module.exports = router;