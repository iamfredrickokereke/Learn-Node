const helmet = require('helmet');
const Logger = require('./Logger');
const morgan = require('morgan');
const Joi = require('joi');
const config = require('config');
const startDebugger = require('debug')('app:startup');
const dbDebugger =  require('debug')('app:db');
const genre = require('./routes/genres');
const home = require('./routes/home');

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

app.use('/api/genres', genre);
app.use('/', home);



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


const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is running on port ${port} `);
})

