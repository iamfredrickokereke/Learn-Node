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

    const {error} = validateCourse(request.body)

    //check input validation

    if (error) {
        // Bad request
        response.status(400).send(error.details[0].message)
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



// update course by ID

app.put('/api/courses/:id', (request, response) => {

    const course = courses.find( c => c.id === parseInt(request.params.id))

    if(!course) {
        response.status(404).send('The course with the given ID was not found.');
    } {   

    const {error} = validateCourse(request.body)
    if (error) {
        // Bad request
        response.status(400).send(error.details[0].message)
        return;
    }

    course.name = request.body.name
    response.send(course);
    }

    



})


function validateCourse(course) {
    const Schema = {
        name : Joi.string().min(3).required()
    };
   return Joi.validate(course, Schema);
}


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is running on port ${port}`);
})