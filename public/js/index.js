// Yasemin: this part is for collection handlebars edit modal
const router = require('express').Router(); //import express and create a new Router
const  { Collection } = require('../../models'); // import Collection model

//Routo for updating a collection
router.put('/:id', async (req, res) => { // collection/:id, id is the placeholderfor actual collection ID andensure the database responce
    try {
        const updatedCollection = await Collection.update( // being sure that code waits for the db update operation completed.
            {
                //object passed to Collection.update (new value for title and description)
                title: req.body.title,
                description: req.body.description,
            },
            {
                //its a condition ensure that changes only apply the object matching id 
                where: {
                    id: req.params.id,
                },
            }
        );

        // 404 msg if the id does not mach
        if (!updatedCollection) {
            res.status(404).json({
                message: 'No collection found!'
            });
            return;
        } //200 respond if is succesufully updates
            res.status(200).json(updatedCollection);

            // catch the arror if any hanppens in try block
        } catch (err){
            // 500 respond if any error occure
            res.status(500).json(err);
        }
    
});

