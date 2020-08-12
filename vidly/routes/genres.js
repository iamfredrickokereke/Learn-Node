const express = require('express');
const router = express.Router();


const genres = [
    {"id": 1, "type": "Animation"},
    {"id": 2, "type": "Action"},
    {"id": 3, "type": "Comedy"},
    {"id": 4, "type": "Crime"},
]


// default route



// Retrieve all genres
router.get('/', (request, response) => {
    response.send(genres)
})

// retrieve a genre by ID

router.get('/:id', (request, response) => {
    const genre = genres.find(g => g.id === parseInt(request.params.id))
    if (!genre) {
        return response.status(404).send('Your Genre ID was not found.')
    }{
        response.send(genre)
    }
})


// Create a new genre

router.post('/', (request, response) => {

      const { error } = validateGenre(request.body);
      
      if (error) {
          return response.status(400).send(error.details[0].message)
      }
   
    const newGenre = {
        "id" : genres.length + 1,
        "type" : request.body.type
    }   
    genres.push(newGenre)
    response.send(newGenre)
})

// update the genre list by ID
router.put('/:id', (request, response) => {
    // search if it exist
    const genre = genres.find(g => g.id === parseInt(request.params.id))
    // return not found

    if (!genre) {
     return   response.status(404).send('Given Course ID was not found')
    }
    // return 
    
    const { error } = validateGenre(request.body);
      
      if (error) {
          return response.status(400).send(error.details[0].message)
      }

    genre.type = request.body.type
    return response.send(genre)
})


// Delete genre from the list

router.delete('/:id', (request, response) => {
    const genre = genres.find( g => g.id === parseInt(request.params.id))    

    if (!genre) {
        return   response.status(404).send('Given Course ID was not found')
       }

    const result = genres.indexOf(genre);

    genres.splice(result, 1);

    response.send(genre)
    
})


function validateGenre(genre) {
    const schema = {
        type : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);

}


module.exports = router;