const express = require('express');

const app = express();

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
    { id: 4, name: 'course4'}
]

app.get('/', (request, response) => {
    response.send('Hello world');
} )

app.get('/api/courses', (request, response) => {
    //response.send([1, 2, 3]);
    response.send(courses)
})


// get courses by ID

app.get('/api/courses/:id', (request, response) => {

    const courser = courses.find( function (course){ course.id === parseInt(request.params.id) } );

    if(!courser) response.status(404).send('The course with the given ID was not found.');
    response.send(courser);
})

const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is running on port ${port}`);
})