const helmet = require('helmet');
const Logger = require('./Logger');
const morgan = require('morgan');
const Joi = require('joi');
const config = require('config');
const startDebugger = require('debug')('app:startup');
const dbDebugger =  require('debug')('app:db');

const express = require('express');

const app = express();

// using template engine

app.set('view engine', 'pug');
app.set('views', './views');


// test debugger
startDebugger('it passed successfully');
dbDebugger('Db connected successfully');


// inbuilt middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

// third party middleware
app.use(helmet());
// app.use(morgan('tiny'));

// custom middleware

app.use(Logger);

const genres = [
    {"id": 1, "type": "Animation"},
    {"id": 2, "type": "Action"},
    {"id": 3, "type": "Comedy"},
    {"id": 4, "type": "Crime"},
]


// Environment

// console.log(process.env.NODE_ENV);
// console.log(`${app.get('env')}`);

if (app.get('env') === 'developmentiu') {
    console.log(`Node Environment: ${app.get('env')}`);    
    app.use(morgan('tiny'));
    console.log('Morgan Enabled...');    
    console.log(`Application name: ${config.get('name')}`);
    console.log(`Version : ${config.get('version')}`);    
    console.log(`Mail password: ${config.get('mail.password')}`);
    
 }else{
   console.log(`Node Environment: ${process.env.NODE_ENV}.....`);
    console.log(`Version : ${config.get('version')}`);
    console.log(`Application name: ${config.get('name')}`);
    // console.log(`Mail Password: ${config.get('mail.password')}`);

    console.log('Mail password : ' + config.get('mail.password'));
    
    
 }








// default route



app.get('/', (request, response) => { 

    if (request.url == '/') {
       return response.send('Welcome to Vidly Rental service!!!')
    }else{
        return response.send('oops not found')
    }

})

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
app.put('/api/genres/:id', (request, response) => {
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

app.delete('/api/genres/:id', (request, response) => {
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

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is running on port ${port} `);
})

