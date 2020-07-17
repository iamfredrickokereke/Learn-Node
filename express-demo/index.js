const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.send('Hello world');
} )

app.get('/api/courses', (request, response) => {
    response.send([1, 2, 3]);
})


// get courses by ID

app.get('/api/courses/:id', (request, response) => {
    response.send(request.params)
})

const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is running on port ${port}`);
})