const express = require('express');

const app = express();

const genres = [
    {"id": 1, "type": "Animation"},
    {"id": 2, "type": "Action"},
    {"id": 3, "type": "Comedy"},
    {"id": 4, "type": "Crime"},
]

// default route
app.get('/', (request, response) => { response.send('Welcome to Vidly Rental service!!!')})

app.get('/api/genres', (request, response) => {
    response.send(genres)
})

// app.post()

// app.put()

// app.delete()

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is running on port ${port} `);
})

