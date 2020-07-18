const Joi = require('joi');

const express = require('express');



const app = express();

app.use(express.json());

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
   
    response.send(courses)
})


//creating a new course

app.post('/api/courses', (request, response) => {

    const Schema = {
        name : Joi.string().min(3).required()
    };

   const result= Joi.validate(request.body, Schema);

   console.log(result);
   



    //check input validation

    if (result.error) {
        // Bad request
        response.status(400).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: request.body.name
    };

    courses.push(course);
    response.send(course);
})


// get courses by ID

app.get('/api/courses/:id', (request, response) => {

    const course = courses.find( c => c.id === parseInt(request.params.id))

    if(!course) {
        response.status(404).send('The course with the given ID was not found.');
    } {   
    response.send(course);
    }
})


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is running on port ${port}`);
})