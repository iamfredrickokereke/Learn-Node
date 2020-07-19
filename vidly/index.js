const express = require('express');

const app = express();

app.use(express.json())
const genres = [
    {"id": 1, "type": "Animation"},
    {"id": 2, "type": "Action"},
    {"id": 3, "type": "Comedy"},
    {"id": 4, "type": "Crime"},
]

// default route
app.get('/', (request, response) => { response.send('Welcome to Vidly Rental service!!!')})

// Retrieve all genres
app.get('/api/genres', (request, response) => {
    response.send(genres)
})

// retrieve a genre by ID

app.get('/api/genres/:id', (request, response) => {
    const genre = genres.find(g => g.id === parseInt(request.params.id))
    if (!genre) {
        return response.status(404).send('Your Genre ID was not found.')
    }{
        response.send(genre)
    }
})


// Create a new genre

app.post('/api/genres', (request, response) => {

    const newgenre = {
        "id" : genres.length + 1,
        "type" : request.body.type
    }
    
    genres.push(newgenre)

    response.send(newgenre)
})

// update the genre list by ID
app.put('/api/genres/:id', (request, response) => {
    // search if it exist
    // return not found
    // return 
})

// app.delete()

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is running on port ${port} `);
})

