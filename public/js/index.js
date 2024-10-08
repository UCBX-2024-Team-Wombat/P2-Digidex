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
    }
})